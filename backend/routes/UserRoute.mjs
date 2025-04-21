import express from "express";
import {
  distributerRegister,
  manufacturerRegister,
  retailerRegister,
} from "../controllers/userController.mjs";

const userRouter = express.Router();

userRouter.post("/manufacturer-registration", manufacturerRegister);
userRouter.post("/distributer-registration", distributerRegister);
userRouter.post("/retailer-registration", retailerRegister);

export default userRouter;
