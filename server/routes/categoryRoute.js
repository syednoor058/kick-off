import express from 'express';
import formidable from 'express-formidable';
import { createCategoryController, getAllCategoriesController, getCategoryController, getCategoryPhotoController } from '../controller/categoryController.js';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router();

// Categorical routes
router.post('/create-category', requireSignIn, isAdmin, formidable(), createCategoryController)
router.get('/categories', getAllCategoriesController);
router.get('/category/:id', getCategoryController);
router.get('/category/photo/:id', getCategoryPhotoController)

export default router;