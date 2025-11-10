import express from "express";
const router = express.Router();
import { getplace } from "../controller/placecontroller.js";
router.get("/:places", getplace);
export default router;