import express from "express";

const router = express.Router();

import {
  getplace,
  getPlacesByDistrict
} from "../controller/placecontroller.js";


// Get places belonging to a particular district
router.get("/district/:districtId", getPlacesByDistrict);


// Existing route
router.get("/:places", getplace);


export default router;