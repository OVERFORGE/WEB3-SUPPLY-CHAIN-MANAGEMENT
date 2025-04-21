import { contract, wallet } from "../utils/web3.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const manufacturerRegister = async (req, res) => {
  try {
    const { name, email, password, walletAddress } = req.body;
    const exists = await prisma.manufacturer.findUnique({
      where: { email },
    });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await prisma.manufacturer.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        walletAddress: walletAddress,
      },
    });
    console.log("Manufacturer registered:", response);
    const token = createToken(response.id);
    res.json({
      success: true,
      message: "Manufacturer registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error registering manufacturer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const distributerRegister = async (req, res) => {
  try {
    const { name, email, password, walletAddress } = req.body;
    const exists = await prisma.distributer.findUnique({
      where: { email },
    });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await prisma.distributer.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        walletAddress: walletAddress,
      },
    });
    console.log("Distributer registered:", response);
    const token = createToken(response.id);
    res.json({
      success: true,
      message: "Distributer registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error registering distributer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const retailerRegister = async (req, res) => {
  try {
    const { name, email, password, walletAddress } = req.body;
    const exists = await prisma.retailer.findUnique({
      where: { email },
    });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await prisma.retailer.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        walletAddress: walletAddress,
      },
    });
    console.log("Retailer registered:", response);
    const token = createToken(response.id);
    res.json({
      success: true,
      message: "Retailer registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error registering retailer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const manufacturerLogin = async (req, res) => {
  const { email, password, walletAddress } = req.body;
  try {
    const user = await prisma.manufacturer.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.walletAddress !== walletAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid wallet address" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = createToken(user.id);
    res.json({
      success: true,
      message: "Manufacturer logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error logining manufacturer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const distributerLogin = async (req, res) => {
  const { email, password, walletAddress } = req.body;
  try {
    const user = await prisma.distributer.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.walletAddress !== walletAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid wallet address" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = createToken(user.id);
    res.json({
      success: true,
      message: "Distributer logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error logining distributer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const retailerLogin = async (req, res) => {
  const { email, password, walletAddress } = req.body;
  try {
    const user = await prisma.retailer.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.walletAddress !== walletAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid wallet address" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = createToken(user.id);
    res.json({
      success: true,
      message: "Retailer logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error logining retailer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  manufacturerRegister,
  distributerRegister,
  retailerRegister,
  manufacturerLogin,
  distributerLogin,
  retailerLogin,
};
