import express from "express";
import { sendotp, signup, login } from "../controller/authcontroller.js";

const router = express.Router();

// Login route
router.post("/login", login);

// Send OTP route
router.post("/send-otp", sendotp);

// Signup route (verifies OTP internally)
router.post("/signup", signup);

export default router;
