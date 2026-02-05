import express from "express";
import {
  submitKyc,
  getMyKyc,
  getAllKyc,
  updateKycStatus,
  fixKycProviderId
} from "../controllers/kyc.controller.js";
import { isAdmin, isAuthenticated} from "../middlewares/jwt.js";
import { pollKycStatus } from "../controllers/kycPolling.controller.js";

const router = express.Router();

/* User routes */
router.post("/submit", isAuthenticated, submitKyc);
router.get("/me", isAuthenticated, getMyKyc);

/* Admin routes */
router.get("/all", isAuthenticated, isAdmin, getAllKyc);
router.put("/:kycId", isAuthenticated, isAdmin, updateKycStatus);
router.post("/fix-provider-id", isAuthenticated, isAdmin, fixKycProviderId);
router.get("/poll/:kycId", isAuthenticated, isAdmin, pollKycStatus);

export default router;
