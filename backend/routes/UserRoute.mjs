import express from "express";
import {
  distributerLogin,
  distributerRegister,
  manufacturerLogin,
  manufacturerRegister,
  retailerLogin,
  retailerRegister,
} from "../controllers/userController.mjs";

const userRouter = express.Router();

userRouter.post("/manufacturer-registration", manufacturerRegister);
userRouter.post("/distributer-registration", distributerRegister);
userRouter.post("/retailer-registration", retailerRegister);
userRouter.post("/manufacturer-login", manufacturerLogin);
userRouter.post("/distributer-login", distributerLogin);
userRouter.post("/retailer-login", retailerLogin);

export default userRouter;
