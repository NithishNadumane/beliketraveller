import express from 'express';
const router = express.Router(); 
import { getreviews } from '../controller/reviewcontroller.js';
router.get('/:placeId', getreviews);
// router.post('/', addreviews);
export default router;