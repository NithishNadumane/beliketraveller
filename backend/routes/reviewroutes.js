import express from 'express';
const router = express.Router(); 
import { getreviews,addreviews } from '../controller/reviewcontroller.js';
router.get('/:placeId', getreviews);
router.post('/', addreviews);
export default router;