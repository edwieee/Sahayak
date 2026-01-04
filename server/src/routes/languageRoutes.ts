import { Router } from "express";
import { getLanguages, getLanguageSample, getTTS, getTranslation } from "../controllers/languageController";

const router = Router();

router.get("/", getLanguages);
router.post("/sample", getLanguageSample);
router.post("/tts", getTTS);
router.post("/translate", getTranslation);

export default router;
