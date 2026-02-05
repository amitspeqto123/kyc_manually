import express from "express";
import {
  submitKyc,
  getMyKyc,
  getAllKyc,
  updateKycStatus
} from "../controllers/kyc.controller.js";
import { isAdmin, isAuthenticated} from "../middlewares/jwt.js";

const router = express.Router();

/* User routes */
router.post("/submit", isAuthenticated, submitKyc);
router.get("/me", isAuthenticated, getMyKyc);

/* Admin routes */
router.get("/all", isAuthenticated, isAdmin, getAllKyc);
router.put("/:kycId", isAuthenticated, isAdmin, updateKycStatus);

export default router;
