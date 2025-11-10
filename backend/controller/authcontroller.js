import pool from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
let otpstore = new Map();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
export const sendotp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "emial is required" });
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpstore.set(email, otp);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "your OTP for BelikeTraveller",
      text: `your otp is ${otp}.It will exprise in 5 minutes.`
    })
    res.json({ message: "otp ent successfully" })
  }
  catch (error) {
    console.error("otp error", error);
    res.status(500).json({ message: "failed to send otp" });
  }
}
export const verifyotpsignup = async (req, res) => {
  const { name, email, password, otp } = req.body;
  if (!name || !email || !password || !otp) return res.status(400).json({ message: "all fields are required" });
  try {
    if (!otpstore.has(email) || otpstore.get(email) !== otp) {
      return res.status(400).json({ message: "invalid otp" });
    }
    otpstore.delete(email);
    const exsistinguser = await pool.query("select * from users where email=$1", [email]);
    if (exsistinguser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query("insert into users (name,email,password) values($1,$2,$3) returning *", [name, email, hashpassword]);

    const token = jwt.sign(
      { id: newUser.rows[0].id, email: newUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Signup successful",
      token,
      user: { id: newUser.rows[0].id, name: newUser.rows[0].name, email: newUser.rows[0].email }
    });

  }
  catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }

}
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "enter the details" });
  try {
    const user = await pool.query("select * from users where email=$1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const validpassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validpassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )
    res.status(200).json({
      message: "login successful",
      token,
      user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email }
    });

  }
  catch (error) {
    console.log("login error :", error)
    res.status(500).json({ message: "login failed" })
  }
}