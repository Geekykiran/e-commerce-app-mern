import { Schema, model } from "mongoose";

let cartSchema = new Schema(
  {
    products: [{ product:Schema.Types.ObjectId,quantity:Number }],
    totalPrice: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      // ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);




const Cart=model("Cart",cartSchema)

export default Cart;