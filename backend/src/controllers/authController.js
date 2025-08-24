import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Merchant from "../models/merchant.model.js";

function generateToken(id, role) {
  return jwt.sign(
    { id, role },
    role === "merchant"
      ? process.env.JWT_MERCHANT_SECRET
      : process.env.JWT_USER_SECRET,
    { expiresIn: "1d" }
  );
}

// Common register and login functions for both Users and Merchants
const register = (Model, role) => async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // 1. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. Check if user already exists
    let existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `${role} with this email already exists` });
    }

    // 4. Create new user (don’t store confirmPassword in DB)
    let newUser = await Model.create({
      username,
      email,
      password
    });

    // 5. Generate JWT
    let token = generateToken(newUser._id, role);

    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = (Model, role) => async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ FIX: Ensure password field is included in query
    let existingUser = await Model.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({
        message: `${role} with this email does not exist, please register`,
      });
    }

    // ✅ FIX: Compare hashed password properly
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    let token = generateToken(existingUser._id, role);
    res.status(200).json({
      username: existingUser.username,
      email: existingUser.email,
      role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userRegister = register(User, "user");
export const merchantRegister = register(Merchant, "merchant");

export const userLogin = login(User, "user");
export const merchantLogin = login(Merchant, "merchant");
