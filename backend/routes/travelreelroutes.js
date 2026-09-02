import express from "express";

const router = express.Router();

import {
  uploadTravelReel,
  getTravelReels,
  getTravelReelsByDistrict,
  getTravelReelsByPlace,
  deleteTravelReel
} from "../controller/travelreelcontroller.js";

import { authenticateUser } from "../middleware/authmiddleware.js";
import upload from "../middleware/upload.js";

// GET ALL APPROVED REELS
router.get("/", getTravelReels);

// GET REELS BY DISTRICT
router.get(
  "/district/:districtId",
  getTravelReelsByDistrict
);

// GET REELS BY PLACE
router.get(
  "/place/:placeId",
  getTravelReelsByPlace
);

// UPLOAD REEL
router.post(
  "/",
  authenticateUser,
  upload.single("video"),
  uploadTravelReel
);

// DELETE REEL
router.delete(
  "/:id",
  authenticateUser,
  deleteTravelReel
);

export default router;