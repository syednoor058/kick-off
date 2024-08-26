import express from 'express';
import { createProductController } from '../controller/productController.js';

const router = express.router();

router.post("/create-product", createProductController)

export default reouter;