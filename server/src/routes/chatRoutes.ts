import { Router } from "express";
import { handleChat, getHistory, handleQuickAction, handleVoiceInput } from "../controllers/chatController";

const router = Router();

router.post("/", handleChat);
router.get("/history", getHistory);
router.post("/quick-action", handleQuickAction);
router.post("/voice-input", handleVoiceInput);

export default router;
