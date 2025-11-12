import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerRoutes from "./routes/registerRoute.js"; 
import blogRoutes from "./routes/blogRoutes.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();

// ✅ FIXED CORS SETUP
app.use(cors({
  origin: "http://localhost:5173",   
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ Routes
app.use("/api/v1", registerRoutes); 
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/user", userRoute);

// ✅ Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 2000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
