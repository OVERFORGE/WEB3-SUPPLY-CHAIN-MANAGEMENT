import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

import contractJson from "../abi/SupplyChain.json" assert { type: "json" };
const contractAbi = contractJson.abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractAbi,
  wallet
);

export { contract, wallet };
