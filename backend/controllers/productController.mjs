import { contract, wallet } from "../utils/web3.mjs";
import { uploadMetadataToIPFS } from "../utils/uploadToIPFS.mjs";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      quantity,
      price,
      location,
      latitude,
      longitude,
    } = req.body;
    const image = req.file;

    const ipfsHash = await uploadMetadataToIPFS({
      name,
      description,
      image,
      location,
      latitude,
      longitude,
    });

    console.log(wallet.address);
    await contract.assignManufacturer(wallet.address);

    const tx = await contract.createProduct(name, quantity, price, ipfsHash);

    const receipt = await tx.wait();
    console.log("All receipt logs:", receipt.logs);

    let prodId;
    if (Array.isArray(receipt.logs)) {
      for (const log of receipt.logs) {
        if (log.fragment?.name === "ProductCreated") {
          prodId = log.args[0].toString(); // 0 = productId
          break;
        }
      }
    } else {
      console.log("No logs found in the receipt:", receipt);
      throw new Error("No logs returned from the transaction.");
    }
    const product = await contract.getProduct(prodId);

    if (tx) {
      const prismaResponse = await prisma.product.create({
        data: {
          id: prodId,
          name: product.name,
          quantity: Number(product.quantity),
          price: Number(product.price),
          description: description,
          currentOwner: product.currentOwner,
          ownershipHistory: product.ownershipHistory,
          locationHistory: product.locationHistory,
          latitude: latitude,
          longitude: longitude,
        },
      });
      console.log(prismaResponse);
    }
    res
      .status(200)
      .json({ success: true, message: "Product created successfully!" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Could not create product" });
  }
};
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await contract.getProduct(productId);

    res.json({
      id: product[0].toString(),
      name: product[1],
      quantity: product[2].toString(),
      price: product[3].toString(),
      currentOwner: product[4],
      ownershipHistory: product[5],
      locationHistory: product[6],
      createdAt: product[7].toString(),
      isActive: product[8],
      ipfsHistory: product[9],
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Could not fetch product" });
  }
};
