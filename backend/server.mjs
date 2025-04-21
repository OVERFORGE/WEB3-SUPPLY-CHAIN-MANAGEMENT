import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.mjs";
import userRouter from "./routes/UserRoute.mjs";
import adminRouter from "./routes/admin/adminRoute.mjs";
import connectCloudinary from "./config/cloudinary.mjs";
dotenv.config();

const app = express();
connectCloudinary();
app.use(express.json());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
