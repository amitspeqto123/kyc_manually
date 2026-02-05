import express from "express";
import {
  createProfile,
  getMyProfile,
  updateProfile
} from "../controllers/profile.controller.js";
import { isAuthenticated, isKycApproved } from "../middlewares/jwt.js";
import { paymentController } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, createProfile);
router.get("/me", isAuthenticated, getMyProfile);
router.put("/update", isAuthenticated, updateProfile);
router.get("/payment", isAuthenticated, isKycApproved, paymentController);

export default router;
