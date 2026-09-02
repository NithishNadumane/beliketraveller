import express from "express";

import { chatWithGemini } from "../controller/chatbotcontroller.js";

const router = express.Router();

router.post("/", chatWithGemini);

export default router;