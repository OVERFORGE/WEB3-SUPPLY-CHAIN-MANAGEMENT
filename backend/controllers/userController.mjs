import { contract, wallet } from "../utils/web3.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import pkg from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
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

const manufacturerUpdateProfile = async (req, res) => {
  const {
    id,
    phoneNumber,
    walletAddress,
    bio,
    companyName,
    longitude,
    latitude,
  } = req.body;

  try {
    let imageUrl;

    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const uploadResult = await streamUpload(req);
      imageUrl = uploadResult.secure_url;
    }

    const response = await prisma.manufacturer.update({
      where: { id },
      data: {
        phoneNumber,
        walletAddress,
        bio,
        companyName,
        longitude,
        latitude,
        ...(imageUrl && { profilePicture: imageUrl }),
      },
    });

    console.log("Updated manufacturer:", JSON.stringify(response, null, 2));

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error updating manufacturer profile:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const distributerUpdateProfile = async (req, res) => {
  const {
    id,
    phoneNumber,
    walletAddress,
    bio,
    companyName,
    longitude,
    latitude,
  } = req.body;

  try {
    let imageUrl;

    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const uploadResult = await streamUpload(req);
      imageUrl = uploadResult.secure_url;
    }

    const response = await prisma.distributer.update({
      where: { id },
      data: {
        phoneNumber,
        walletAddress,
        bio,
        companyName,
        longitude,
        latitude,
        ...(imageUrl && { profilePicture: imageUrl }),
      },
    });

    console.log("Updated distributer:", JSON.stringify(response, null, 2));

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error updating distributer profile:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const retailerUpdateProfile = async (req, res) => {
  const {
    id,
    phoneNumber,
    walletAddress,
    bio,
    companyName,
    longitude,
    latitude,
  } = req.body;

  try {
    let imageUrl;

    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const uploadResult = await streamUpload(req);
      imageUrl = uploadResult.secure_url;
    }

    const response = await prisma.retailer.update({
      where: { id },
      data: {
        phoneNumber,
        walletAddress,
        bio,
        companyName,
        longitude,
        latitude,
        ...(imageUrl && { profilePicture: imageUrl }),
      },
    });

    console.log("Updated retailer:", JSON.stringify(response, null, 2));

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error updating retailer profile:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const isUser = async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const isManufacturer = await prisma.manufacturer.findUnique({
      where: { walletAddress },
    });
    const isDistributer = await prisma.distributer.findUnique({
      where: { walletAddress },
    });
    const isRetailer = await prisma.retailer.findUnique({
      where: { walletAddress },
    });
    if (isManufacturer || isDistributer || isRetailer) {
      res.json({
        success: true,
        message: "User found",
        isManufacturer: 1 && isManufacturer,
        isDistributer: 1 && isDistributer,
        isRetailer: 1 && isRetailer,
      });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export {
  manufacturerRegister,
  distributerRegister,
  retailerRegister,
  manufacturerLogin,
  distributerLogin,
  retailerLogin,
  manufacturerUpdateProfile,
  distributerUpdateProfile,
  retailerUpdateProfile,
  isUser,
};
