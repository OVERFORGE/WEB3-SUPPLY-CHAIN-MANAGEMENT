import express from "express";
import {
  distributerLogin,
  distributerRegister,
  distributerUpdateProfile,
  isUser,
  manufacturerLogin,
  manufacturerRegister,
  manufacturerUpdateProfile,
  retailerLogin,
  retailerRegister,
  retailerUpdateProfile,
} from "../controllers/userController.mjs";
import { upload } from "../utils/uploadToIPFS.mjs";

const userRouter = express.Router();

userRouter.post(
  "/manufacturer-update-profile",
  upload.single("image"),
  manufacturerUpdateProfile
);
userRouter.post(
  "/distributer-update-profile",
  upload.single("image"),
  distributerUpdateProfile
);
userRouter.post(
  "/retailer-update-profile",
  upload.single("image"),
  retailerUpdateProfile
);
userRouter.post("/manufacturer-registration", manufacturerRegister);
userRouter.post("/distributer-registration", distributerRegister);
userRouter.post("/retailer-registration", retailerRegister);
userRouter.post("/manufacturer-login", manufacturerLogin);
userRouter.post("/distributer-login", distributerLogin);
userRouter.post("/retailer-login", retailerLogin);
userRouter.post("/is-user", isUser);

export default userRouter;
