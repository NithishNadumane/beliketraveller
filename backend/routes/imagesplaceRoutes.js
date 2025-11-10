import express from "express";
import { getImagesByPlaceId } from "../controller/imagesplaceController.js";

const router = express.Router();

// GET /api/images/:placeId
router.get("/:placeId", getImagesByPlaceId);

export default router;
