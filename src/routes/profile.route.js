import express from "express";
import {
  createProfile,
  getMyProfile,
  updateProfile
} from "../controllers/profile.controller.js";
import { isAuthenticated } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/create", isAuthenticated, createProfile);
router.get("/me", isAuthenticated, getMyProfile);
router.put("/update", isAuthenticated, updateProfile);

export default router;
