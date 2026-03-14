import express from "express";
const router = express.Router();
import { travelagencycontroller } from "../controller/travelagencycontroller.js";
router.get("/:placeId", travelagencycontroller);
export default router;