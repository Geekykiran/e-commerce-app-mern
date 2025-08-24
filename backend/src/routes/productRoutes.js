import express from 'express'
import { auth } from '../middlewares/merchantAuth.js';
import { addProduct, deleteProduct, getProduct, getProducts, getProductsByMerchant, updateProduct } from '../controllers/product.controller.js';

let router = express.Router()


router.post("/addproduct", auth, addProduct) // add single product by merchant
router.get("/merchant", auth, getProductsByMerchant)  //get all products of particular merchant
router.get("/", getProducts) //get all products to display for user
router.get("/:id", auth, getProduct)  //get single product by passing product ID of a merchant
router.patch("/:id", auth, updateProduct)  //merchant
router.delete("/:id", auth, deleteProduct) //merchant

export default router;