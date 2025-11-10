import express from 'express';
const router = express.Router();
import { getrentals } from '../controller/rentalcontroller.js';
router.get('/:placeId', getrentals);
export default router;