import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryControllers.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routes
//CREATE CATEGORY
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);
//UPDATE CATEGORY
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);
// GET ALL CATEGORIES
router.get("/allcategories", getAllCategoryController);

//GET SINGLE CATEGORIES
router.get("/single-category/:slug", getSingleCategoryController);

//DELETE CATEGORY
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
);





export default router;