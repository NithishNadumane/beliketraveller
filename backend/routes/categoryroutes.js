import express from "express";
const router = express.Router();
import { getplacebycategory } from "../controller/categorycontroller.js";
router.get("/:districtId/:selectedCategory", getplacebycategory);
export default router;