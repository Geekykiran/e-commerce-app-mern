import express from "express";
import { AddToCart, deleteCart, getCart, removeProductFromCart } from "../controllers/cart.controller.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

// get the cart of the logged in user based on Bearer Token
router.get("/", userAuth, getCart);
// Add or update products in cart
router.post("/", userAuth, AddToCart);

// Remove a product from cart
router.delete("/product", userAuth, removeProductFromCart);

// Update quantity of a product in cart
// router.put("/update", userAuth, updateProductQuantity);

// Delete entire cart
router.delete("/", userAuth, deleteCart);

export default router;