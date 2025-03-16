import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import bodyParser from "body-parser";
import paymentRoute from './routes/paymentRoutes.js'
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://mernprojectecommerce-frontend-rp07.onrender.com", credentials: true })); // Adjust origin for frontend
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/payment/",paymentRoute);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
