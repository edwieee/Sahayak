import { Router } from "express";
import { handleSOS } from "../controllers/sosController";

const router = Router();

router.post("/", handleSOS);

export default router;
