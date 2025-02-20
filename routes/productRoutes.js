import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController,
  getSingleProductController,
  productPhotoController,
} from "../controllers/productControllers.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable"

//router object
const router = express.Router();

//routes
//CREATE PRODUCT
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

// GET ALL PRODUCTS
router.get("/get-products", getProductController);

//GET SINGLE PRODUCT
router.get("/get-product/:slug", getSingleProductController);

//product photo controller
router.get("/product-photo/:pid", productPhotoController);

//UPDATE PRODUCT
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//DELETE PRODUCT
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router