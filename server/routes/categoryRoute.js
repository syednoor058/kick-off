import express from "express";
import formidable from "express-formidable";
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoriesController,
    getCategoryController,
    getCategoryPhotoController,
    updateCategoryController,
} from "../controller/categoryController.js";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

const router = express.Router();

// Categorical routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);
router.get("/categories", getAllCategoriesController);
router.get("/category/:id", getCategoryController);
router.get("/category/photo/:id", getCategoryPhotoController);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateCategoryController
);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
