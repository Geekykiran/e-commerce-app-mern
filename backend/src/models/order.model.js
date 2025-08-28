import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        merchant: { type: Schema.Types.ObjectId, ref: "Merchant", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
    invoiceId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Auto-generate invoiceId like INV-<timestamp>
orderSchema.pre("save", function (next) {
  if (!this.invoiceId) {
    this.invoiceId = `INV-${Date.now()}`;
  }

  // Auto-calc totalAmount from products
  if (this.products && this.products.length > 0) {
    this.totalAmount = this.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
