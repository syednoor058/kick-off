import express from "express";
import { getOrderController, placeOrderController, updateOrderController } from "../controller/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place-order", requireSignIn, placeOrderController);
router.get("/get-order", requireSignIn, getOrderController)
router.put("/edit-order/:_id", requireSignIn, isAdmin, updateOrderController)

export default router;
