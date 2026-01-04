import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";

const router = Router();

router.get("/", getProfile);
router.post("/update", updateProfile); // Using POST for upsert/update convenience
router.post("/create", updateProfile); // Alias for clarity

export default router;
