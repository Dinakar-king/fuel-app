import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Import routes
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";
import bookingRoutes from "./routes/booking.js";
import authRoutes from "./routes/auth.js";
import fuelRoutes from "./routes/fuels.js";
import servicesRoutes from "./routes/services.js";
import contactRoutes from "./routes/contact.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fuels", fuelRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
