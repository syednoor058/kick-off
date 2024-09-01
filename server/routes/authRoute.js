import express from "express";
import {
  loginController,
  registerController,
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

export default router;
