import express from "express";
import {
  listDistributers,
  listManufacturers,
  listProducts,
  listRetailers,
} from "../../controllers/admin/adminController.mjs";

const adminRouter = express.Router();

adminRouter.get("/list-distributers", listDistributers);
adminRouter.get("/list-manufacturers", listManufacturers);
adminRouter.get("/list-retailers", listRetailers);
adminRouter.get("/list-products", listProducts);
export default adminRouter;
