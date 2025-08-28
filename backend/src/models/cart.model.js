import { Schema, model } from "mongoose";

let cartSchema = new Schema(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
      }
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);




const Cart = model("Cart", cartSchema)

export default Cart;