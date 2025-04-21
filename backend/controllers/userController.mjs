import { contract, wallet } from "../utils/web3.mjs";

import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const manufacturerRegister = async (req, res) => {
  try {
    const { name, email, password, walletAddress } = req.body;
    console.log(name, email, password, walletAddress);
    const response = await prisma.manufacturer.create({
      data: {
        name: name,
        email: email,
        password: password,
        walletAddress: walletAddress,
      },
    });
    console.log("Manufacturer registered:", response);
    res.json({
      success: true,
      message: "Manufacturer registered successfully",
    });
  } catch (error) {
    console.error("Error registering manufacturer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const distributerRegister = async (req, res) => {
  try {
    const { name, email, password, walletAddress } = req.body;
    console.log(name, email, password, walletAddress);
    const response = await prisma.distributer.create({
      data: {
        name: name,
        email: email,
        password: password,
        walletAddress: walletAddress,
      },
    });
    console.log("Distributer registered:", response);
    res.json({ success: true, message: "Distributer registered successfully" });
  } catch (error) {
    console.error("Error registering distributer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const retailerRegister = async (req, res) => {
  try {
    const { name, email, password, walletAddress } = req.body;
    console.log(name, email, password, walletAddress);
    const response = await prisma.retailer.create({
      data: {
        name: name,
        email: email,
        password: password,
        walletAddress: walletAddress,
      },
    });
    console.log("Retailer registered:", response);
    res.json({ success: true, message: "Retailer registered successfully" });
  } catch (error) {
    console.error("Error registering retailer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { manufacturerRegister, distributerRegister, retailerRegister };
