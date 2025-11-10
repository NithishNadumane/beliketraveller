import express from 'express';
const router = express.Router();
import { getdistricts } from '../controller/districtcontroller.js';
router.get('/:district',getdistricts);
export default router;