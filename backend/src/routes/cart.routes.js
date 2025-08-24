import express from "express";
import { AddToCart, deleteCart, getCart, removeProductFromCart } from "../controllers/cart.controller.js";
import { auth } from "../middlewares/userAuth.js";

const router = express.Router();

// get the cart of the logged in user based on Bearer Token
router.get("/", auth, getCart);
// Add or update products in cart
router.post("/", auth, AddToCart);

// Remove a product from cart
router.delete("/product", auth, removeProductFromCart);

// Update quantity of a product in cart
// router.put("/update", userAuth, updateProductQuantity);

// Delete entire cart
router.delete("/", auth, deleteCart);

export default router;