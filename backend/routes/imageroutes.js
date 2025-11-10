import express from "express";
import { getImagesByDistrict } from "../controller/imagecontroller.js";

const router = express.Router();

// GET /api/images/:districtName
router.get("/:districtName", getImagesByDistrict);

export default router;
