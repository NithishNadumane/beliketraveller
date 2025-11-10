import express from "express";
import { chatWithLlama } from "../controller/chatbotcontroller.js"; 

const router = express.Router();

router.post("/", chatWithLlama);

export default router;
