import express from "express"
import { merchantLogin, merchantRegister } from "../controllers/authController.js"

let router = express.Router()

router.post("/register", merchantRegister)
router.post("/login", merchantLogin)

export default router