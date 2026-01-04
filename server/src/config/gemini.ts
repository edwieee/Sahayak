import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing Gemini API key in .env. AI features will fail.");
}

const genAI = new GoogleGenerativeAI(apiKey || "mock-key");

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });
