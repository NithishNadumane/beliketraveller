import express from 'express';
const router = express.Router();
import {
  getdistricts,
  getAllDistricts
} from "../controller/districtcontroller.js";
router.get("/", getAllDistricts);

router.get('/:district', getdistricts);
export default router;