// backend/routes/districtRoutes.js
import express from "express";
const router = express.Router();
import { searchplace } from "../controller/destinationcontroller.js";
router.get("/", searchplace);
export default router;

