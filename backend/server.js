import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authroutes from "./routes/authroutes.js";
import destinationroutes from "./routes/destinationroutes.js";
import districtroutes from "./routes/districtroutes.js";
import imageroutes from "./routes/imageroutes.js";
import placeroutes from "./routes/placeroutes.js";
import reviewroutes from "./routes/reviewroutes.js";
import categoryroutes from "./routes/categoryroutes.js";
import chatroutes from "./routes/chatroutes.js";
import rentalroutes from "./routes/rentalroutes.js";
import imageplaceRoutes from "./routes/imagesplaceRoutes.js";

dotenv.config();

const app = express();

/* =======================
   CORS CONFIG (IMPORTANT)
======================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://beliketraveller.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

/* =======================
   ROUTES
======================= */
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

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
