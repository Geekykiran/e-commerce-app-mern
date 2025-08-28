import Merchant from "../models/merchant.model.js";
import jwt from "jsonwebtoken";

export const merchantAuth = async (req, res, next) => {
  try {
    let token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      res.status(400).json("Please login!!");
      return;
    }
    let decodedToken = jwt.verify(token, process.env.JWT_MERCHANT_SECRET);
    let merchant = await Merchant.findById(decodedToken.id);
    if (!merchant) {
      res.status(400).json("Merchant doest exist anymore please signup!!");
      return;
    }
    req.merchant = {
      id: merchant._id,
      role: "merchant",
    };
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};