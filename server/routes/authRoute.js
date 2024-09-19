import express from "express";
import {
  deleteCartController,
  getCartController,
  loginController,
  registerController,
  userCartController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register route
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user-auth", requireSignIn, (_req, res) => {
  res.status(200).send({
    ok: true,
  });
});
router.get("/admin-auth", requireSignIn, isAdmin, (_req, res) => {
  res.status(200).send({
    ok: true,
  });
});

router.post("/cart/:userId", requireSignIn, userCartController);
router.get("/cart/:userId", requireSignIn, getCartController);
router.post("/cart_delete/:userId", requireSignIn, deleteCartController)

export default router;
