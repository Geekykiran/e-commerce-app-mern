// routes/orderRoutes.js
import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { merchantAuth } from "../middlewares/merchantAuth.js";
import { placeOrder, getUserOrders, getMerchantOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place", userAuth, placeOrder);
router.get("/user", userAuth, getUserOrders);
router.get("/merchant", merchantAuth, getMerchantOrders);

export default router;
