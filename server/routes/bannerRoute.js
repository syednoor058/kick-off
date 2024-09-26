import express from "express";
import { getCarausolController, updateCarausolController, uploadCarausolController } from "../controller/bannerCarausolController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload-carausol",
  requireSignIn,
  isAdmin,
  uploadCarausolController
);
router.get("/get-carausol", getCarausolController);
router.put(
  "/update-carausol",
  requireSignIn,
  isAdmin,
  updateCarausolController
);


export default router;