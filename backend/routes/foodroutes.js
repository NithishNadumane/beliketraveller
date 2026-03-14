import express from "express";
import { getpopularfood, getrestaurants, getstays } from "../controller/foodcontroller.js";
const router = express.Router();
router.get("/popular_food_places", getpopularfood);
router.get("/restaurants", getrestaurants);
router.get("/stays", getstays);
export default router;
