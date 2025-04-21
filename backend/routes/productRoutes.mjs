import express from "express";

import { getProduct, addProduct } from "../controllers/productController.mjs";
import { upload } from "../utils/uploadToIPFS.mjs";

const productRouter = express.Router();

productRouter.get("/:productId", getProduct);
productRouter.post("/add", upload.single("image"), addProduct);

export default productRouter;
