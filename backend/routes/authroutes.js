import express from "express";
const router = express.Router();
import { sendotp, verifyotpsignup, login } from "../controller/authcontroller.js"
router.post("/login", login)
router.post("/send-otp", sendotp);
router.post("/signup", verifyotpsignup);
export default router;  