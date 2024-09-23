import express from "express";
import { placeOrderController } from "../controller/orderController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place-order", requireSignIn, placeOrderController);

export default router;
