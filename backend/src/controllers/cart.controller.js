import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";


export const AddToCart = async (req, res, next) => {
    try {
        const { products } = req.body; // [{product, quantity}]
        let cart = await Cart.findOne({ user: req.user.id });

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "No products provided" });
        }

        if (cart) {
            // Update existing cart
            for (const item of products) {
                const idx = cart.products.findIndex(p => p.product.toString() === item.product);
                if (idx > -1) {
                    // Update quantity
                    cart.products[idx].quantity += item.quantity;
                } else {
                    // Add new product
                    cart.products.push({ product: item.product, quantity: item.quantity });
                }
            }
        } else {
            // Create new cart
            cart = new Cart({
                products,
                user: req.user.id
            });
        }

        // Recalculate total price
        let totalPrice = 0;
        for (const item of cart.products) {
            const prod = await Product.findById(item.product);
            if (prod) {
                totalPrice += prod.price * item.quantity;
            }
        }
        cart.totalPrice = totalPrice;
        await cart.save();

        // Link cart to user if new
        let user = await User.findById(req.user.id);
        if (user && (!user.cart )) {
            user.cart = cart._id;
            await user.save();
        }

        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart doesn't exist" });
        }
        await Cart.findByIdAndDelete(cart._id);
        // Remove cart reference from user
        let user = await User.findById(req.user.id);
        if (user) {
            user.cart = undefined;
            await user.save();
        }
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Remove a product from cart
export const removeProductFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        // Recalculate total price
        let totalPrice = 0;
        for (const item of cart.products) {
            const prod = await Product.findById(item.product);
            if (prod) totalPrice += prod.price * item.quantity;
        }
        cart.totalPrice = totalPrice;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update quantity of a product in cart
// export const updateProductQuantity = async (req, res, next) => {
//     try {
//         const { productId, quantity } = req.body;
//         let cart = await Cart.findOne({ user: req.user.id });
//         if (!cart) return res.status(404).json({ message: "Cart not found" });
//         const idx = cart.products.findIndex(p => p.product.toString() === productId);
//         if (idx === -1) return res.status(404).json({ message: "Product not in cart" });
//         cart.products[idx].quantity = quantity;
//          Recalculate total price
//         let totalPrice = 0;
//         for (const item of cart.products) {
//             const prod = await Product.findById(item.product);
//             if (prod) totalPrice += prod.price * item.quantity;
//         }
//         cart.totalPrice = totalPrice;
//         await cart.save();
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

export const getCart=async (req,res,next)=>{
    try {
        let existingCart=await Cart.findOne({user:req.user.id})
        if(!existingCart){
            res.status(201).json({message:"Cart doesnt exist"})
            return ;
        }
        res.status(200).json(existingCart)
    } catch (error) {
     res.status(400).json({message:error.message})   
    }
} 