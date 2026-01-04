import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { initDb } from "./db";
import { register, login, updateLocation } from "./controllers/authController";
import { trackActivity, getUserDashboard } from "./controllers/userController";
import { updateContent, getNotifications } from "./controllers/adminController";
import { updateJsonFile } from "./controllers/contentController";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
initDb();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// Protected Routes
app.post("/api/user/location", authMiddleware, updateLocation);
app.post("/api/user/activity", authMiddleware, trackActivity);
app.get("/api/user/dashboard", authMiddleware, getUserDashboard);
app.get("/api/user/notifications", authMiddleware, getNotifications);

// Admin Routes (Simplified security for demo)
app.post("/api/admin/update-content", updateContent);
app.post("/api/admin/json-update", updateJsonFile);

app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Sahayak Platform API is running" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
