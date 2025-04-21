import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
import { contract, wallet } from "../../utils/web3.mjs";

const listManufacturers = async (req, res) => {
  try {
    const manufacturers = await prisma.manufacturer.findMany();
    res.json(manufacturers);
  } catch (error) {
    console.error("Error listing manufacturers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const listDistributers = async (req, res) => {
  try {
    const distributers = await prisma.distributer.findMany();
    res.json(distributers);
  } catch (error) {
    console.error("Error listing distributers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const listRetailers = async (req, res) => {
  try {
    const retailers = await prisma.retailer.findMany();
    res.json(retailers);
  } catch (error) {
    console.error("Error listing retailers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const grantRole = async (req, res) => {
  const { id, role, walletAddress } = req.body;
  try {
    if (role === "Manufacturer") {
      const tx = await contract.assignManufacturer(walletAddress);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        await prisma.manufacturer.update({
          where: { id },
          data: {
            walletAddress,
            isVerified: true,
          },
        });
        res.json({
          success: true,
          message: "Role granted and manufacturer verified",
        });
      } else {
        res.status(400).json({ success: false, message: "Transaction failed" });
      }
    } else if (role === "Distributer") {
      const tx = await contract.assignDistributer(walletAddress);
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        await prisma.distributer.update({
          where: { id },
          data: {
            walletAddress,
            isVerified: true,
          },
        });
        res.json({
          success: true,
          message: "Role granted and distributer verified",
        });
      } else {
        res.status(400).json({ success: false, message: "Transaction failed" });
      }
    } else if (role === "Retailer") {
      const tx = await contract.assignRetailer(walletAddress);
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        await prisma.retailer.update({
          where: { id },
          data: {
            walletAddress,
            isVerified: true,
          },
        });
        res.json({
          success: true,
          message: "Role granted and retailer verified",
        });
      } else {
        res.status(400).json({ success: false, message: "Transaction failed" });
      }
    }
  } catch (error) {
    console.error("Error while granting the role:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  listManufacturers,
  listDistributers,
  listRetailers,
  listProducts,
  grantRole,
};
