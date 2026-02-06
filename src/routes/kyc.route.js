import express from "express";
import {
  submitKyc,
  getMyKyc,
  getAllKyc,
  updateKycStatus,
  fixKycProviderId
} from "../controllers/kyc.controller.js";
import { isAdmin, isAuthenticated} from "../middlewares/jwt.js";
import { personaWebhook, pollKycStatus } from "../controllers/kycPolling.controller.js";

const router = express.Router();

// Custom middleware for webhook to handle raw JSON
const webhookMiddleware = (req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(data);
        next();
      } catch (err) {
        res.status(400).json({ message: 'Invalid JSON' });
      }
    });
  } else {
    next();
  }
};

/* User routes */
router.post("/submit", isAuthenticated, submitKyc);
router.get("/me", isAuthenticated, getMyKyc);

/* Admin routes */
router.get("/all", isAuthenticated, isAdmin, getAllKyc);
router.put("/:kycId", isAuthenticated, isAdmin, updateKycStatus); // admin manual update
router.post("/fix-provider-id", isAuthenticated, isAdmin, fixKycProviderId);
router.get("/poll/:kycId", isAuthenticated, isAdmin, pollKycStatus);
router.post("/webhook/persona", personaWebhook);

export default router;
