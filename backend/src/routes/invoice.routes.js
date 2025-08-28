import express from "express";
import { generateInvoice } from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/:id", generateInvoice);

export default router;
