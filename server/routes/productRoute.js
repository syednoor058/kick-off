import express from 'express';
import formidable from 'express-formidable';
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, updateProductController } from '../controller/productController.js';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, formidable({multiples: true}), createProductController);
router.put("/update-product/:id", requireSignIn, isAdmin, formidable({multiples: true}), updateProductController);
router.get("/get-product", getProductController);
router.get("/get-product/:id", getSingleProductController)
router.get("/get-product-photo/:id", getProductPhotoController)
router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProductController)

export default router;