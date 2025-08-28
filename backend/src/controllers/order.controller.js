import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// -------------------- PLACE ORDER --------------------
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { billingAddress } = req.body;

    if (!billingAddress || Object.keys(billingAddress).length === 0) {
      return res.status(400).json({ message: "Billing address is required" });
    }

    // Fetch cart
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }

    // Build products array for Order
    const products = [];
    for (const item of cart.products) {
      if (!item.product) throw new Error("Product not found in cart");

      const prod = await Product.findById(item.product._id).populate("merchant", "_id");
      if (!prod || !prod.merchant) throw new Error("Product has no merchant");

      products.push({
        product: prod._id,
        merchant: prod.merchant._id,
        quantity: item.quantity,
        price: prod.price, // store unit price
      });
    }

    // Calculate total amount
    const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    // Create order
    const order = await Order.create({
      user: userId,
      products,
      billingAddress,
      totalAmount,
    });

    // Clear cart
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- USER ORDERS --------------------
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")
      .populate("products.merchant", "username email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------- MERCHANT ORDERS --------------------
export const getMerchantOrders = async (req, res) => {
  try {
    const merchantId = req.merchant.id;

    const orders = await Order.find({ "products.merchant": merchantId })
      .populate("user", "username email")
      .populate("products.product");

    // Only return this merchant’s products
    const filteredOrders = orders.map((order) => {
      const merchantProducts = order.products.filter(
        (p) => p.merchant.toString() === merchantId
      );

      return {
        invoiceId: order.invoiceId,
        user: order.user,
        billingAddress: order.billingAddress,
        products: merchantProducts.map((p) => ({
          product: p.product,
          quantity: p.quantity,
          price: p.price,
          subtotal: p.price * p.quantity,
        })),
        totalAmount: merchantProducts.reduce(
          (sum, p) => sum + p.price * p.quantity,
          0
        ),
        createdAt: order.createdAt,
      };
    });

    res.status(200).json(filteredOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};