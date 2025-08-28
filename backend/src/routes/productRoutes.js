import express from 'express'
import { merchantAuth } from '../middlewares/merchantAuth.js';
import { addProduct, deleteProduct, getProduct, getProducts, getProductsByMerchant, updateProduct } from '../controllers/product.controller.js';

let router = express.Router()


router.post("/addproduct", merchantAuth, addProduct) // add single product by merchant
router.get("/merchant", merchantAuth, getProductsByMerchant)  //get all products of particular merchant
router.get("/", getProducts) //get all products to display for user
router.get("/:id", merchantAuth, getProduct)  //get single product by passing product ID of a merchant
router.patch("/:id", merchantAuth, updateProduct)  //merchant
router.delete("/:id", merchantAuth, deleteProduct) //merchant

export default router;