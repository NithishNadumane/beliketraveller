import express from 'express';
import cors from 'cors';
import pool from './db.js';
import dotenv from 'dotenv';
import authroutes from './routes/authroutes.js';
import destinationroutes from './routes/destinationroutes.js';
import districtroutes from './routes/districtroutes.js';
import imageroutes from "./routes/imageroutes.js";
import placeroutes from './routes/placeroutes.js';
import reviewroutes from './routes/reviewroutes.js';
import categoryroutes from './routes/categoryroutes.js';
import chatroutes from './routes/chatroutes.js';
import rentalroutes from './routes/rentalroutes.js';
import imageplaceRoutes from "./routes/imagesplaceRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authroutes);
app.use("/api/search", destinationroutes);
app.use("/api/districts", districtroutes);
app.use("/api/images", imageroutes);
app.use("/api/places", placeroutes);
app.use("/api/reviews", reviewroutes);
app.use("/api/categories", categoryroutes);
app.use("/api/chat", chatroutes);
app.use("/api/rentals", rentalroutes);
app.use("/api/imagesplace", imageplaceRoutes);
app.listen(5000, () => {
  console.log("server runs in http://localhost:5000")
});
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});
