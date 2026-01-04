import { Request, Response } from "express";
import { getAudioUrl } from "google-tts-api";
import { supabase } from "../config/supabase";
import { spawn } from "child_process";
import path from "path";

export const getLanguages = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from("languages").select("*").eq("is_active", true);

        if (error) throw error;

        // Fallback if DB is empty (during dev/prototype without migrations run)
        const languages = data?.length ? data : [
            { code: "en", name: "English", native_name: "English", tts_voice: "en-IN" },
            { code: "hi", name: "Hindi", native_name: "हिन्दी", tts_voice: "hi-IN" },
            { code: "bn", name: "Bengali", native_name: "বাংলা", tts_voice: "bn-IN" },
            { code: "te", name: "Telugu", native_name: "తెలుగు", tts_voice: "te-IN" },
            { code: "ta", name: "Tamil", native_name: "தமிழ்", tts_voice: "ta-IN" },
            { code: "ml", name: "Malayalam", native_name: "മലയാളം", tts_voice: "ml-IN" },
        ];

        res.json(languages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch languages" });
    }
};

const sampleTexts: Record<string, string> = {
    "en": "Hello, how are you?",
    "hi": "Namaste, aap kaise hain?",
    "ml": "Namaskaram, sukhamano?",
    "ta": "Vanakkam, epdi irukkinga?",
    "te": "Namaskaram, ela unnaru?",
    "kn": "Namaskara, hegiddaya?"
};

export const getLanguageSample = async (req: Request, res: Response) => {
    try {
        const { language_code } = req.body;

        const text = sampleTexts[language_code] || "Hello, how are you?";
        const ttsLang = language_code === 'ml' ? 'ml' : (language_code || 'en');

        const url = getAudioUrl(text, {
            lang: ttsLang,
            slow: false,
            host: 'https://translate.google.com',
        });

        res.json({ audio_url: url, text });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate sample" });
    }
};

export const getTTS = async (req: Request, res: Response) => {
    try {
        const { text, language_code } = req.body;

        if (!text) {
            res.status(400).json({ error: "Text is required" });
            return;
        }

        const outputDir = path.join(__dirname, "../../public/audio");
        const scriptPath = path.join(__dirname, "../../tts_service.py");

        const pythonProcess = spawn("python", [scriptPath, text, language_code || "en", outputDir]);

        let audioFilename = "";
        let errorOutput = "";

        pythonProcess.stdout.on("data", (data) => {
            audioFilename += data.toString().trim();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code !== 0) {
                console.error("Python TTS Error:", errorOutput);
                // Fallback to Google URL logic if python fails
                const ttsLang = language_code === 'ml' ? 'ml' : (language_code || 'en');
                const url = getAudioUrl(text.substring(0, 200), { lang: ttsLang, slow: false, host: 'https://translate.google.com' });
                res.json({ audio_url: url, text });
                return;
            }

            // Return local URL
            const audioUrl = `http://localhost:5000/public/audio/${audioFilename}`;
            res.json({ audio_url: audioUrl, text });
        });

    } catch (error) {
        console.error("TTS Error", error);
        res.status(500).json({ error: "Failed to generate audio" });
    }
};

export const getTranslation = async (req: Request, res: Response) => {
    try {
        const { content, language_code } = req.body;

        if (!content || !language_code) {
            res.status(400).json({ error: "Content and language_code required" });
            return;
        }

        if (language_code === 'en') {
            res.json(content);
            return;
        }

        const scriptPath = path.join(__dirname, "../../translate_service.py");
        // We pass the content as a JSON string argument
        const contentString = JSON.stringify(content);

        const pythonProcess = spawn("python", [scriptPath, language_code, contentString]);

        let resultString = "";
        let errorString = "";

        pythonProcess.stdout.on("data", (data) => {
            resultString += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorString += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code !== 0) {
                console.error("Translation Error:", errorString);
                res.json(content); // Fallback to original
                return;
            }
            try {
                const translated = JSON.parse(resultString.trim());
                res.json(translated);
            } catch (e) {
                console.error("Failed to parse translation output", e);
                res.json(content);
            }
        });

    } catch (error) {
        console.error("Translation Controller Error", error);
        res.status(500).json({ error: "Translation failed" });
    }
};
