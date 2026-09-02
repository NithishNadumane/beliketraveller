import express from "express";

const router = express.Router();

import {
  getreviews,
  addreviews,
} from "../controller/reviewcontroller.js";

// import { authenticateUser } from "../middleware/authMiddleware.js";
import { authenticateUser } from "../middleware/authmiddleware.js";
// Anyone can view reviews
router.get("/:placeId", getreviews);

// Only logged-in users can add reviews
router.post("/", authenticateUser, addreviews);

export default router;