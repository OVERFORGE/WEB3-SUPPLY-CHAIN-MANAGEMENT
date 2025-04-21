import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

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
  } catch (error) {
    console.error("Error while granting the role:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { listManufacturers, listDistributers, listRetailers, listProducts };
