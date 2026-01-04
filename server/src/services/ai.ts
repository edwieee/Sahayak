import { model } from "../config/gemini";

interface ChatRequest {
    text: string;
    language: string; // e.g. "hi", "en", "ml"
    history?: { role: "user" | "model"; parts: string }[];
}

export const generateResponse = async ({ text, language, history = [] }: ChatRequest) => {
    try {
        const chat = model.startChat({
            history: history.length > 0 ? history.map(h => ({
                role: h.role,
                parts: [{ text: h.parts as unknown as string }] // Input history coming as string
            })) : undefined,
        });

        const SYSTEM_PROMPT = `
You are "Sahayak AI", a friendly and conversational assistant designed for everyday people who may have low digital literacy.

CRITICAL RULES:
1. LANGUAGE: Respond ONLY in the requested language. Use simple, everyday words.
2. NO JARGON: Avoid all technical, legal, or complex jargon. If you must use a complex term, explain it immediately in simple words.
3. FORMATTING: Use clear step-by-step instructions or bullet points. Avoid long paragraphs.
4. TONE: Be helpful, patient, and friendly. Start responses with a welcoming greeting like "Namaste!" or "Hello!".
5. STRUCTURE: 
   - Start with a clear "Here is a simple explanation:"
   - Use "First...", "Next...", "Finally..." for steps.
   - Keep the summary very short (1 sentence).

You MUST respond in valid JSON format with this structure:
{
  "main_response": "The simplified step-by-step explanation",
  "short_summary": "1 sentence teaser",
  "podcast_script": "Conversational version for voice",
  "documents": ["list of docs if any"],
  "steps": [{ "title": "Step title", "description": "detail" }]
}

Your goal is to make the user feel supported and understood.

Stats:
- User Language: ${language} (You MUST respond in this language).
- Tone: Empathetic, Clear, Concise.

Job:
1. Analyse the user's input.
2. Determine their intent (Service Search, SOS, General Info).
3. Provide a structured response.
Output JSON Format ONLY:
{
  "intent": "service" | "sos" | "info" | "greeting",
  "main_response": "Full detailed helpful answer in ${language}",
  "short_summary": "1-sentence summary for quick reading in ${language}",
  "podcast_script": "A natural, conversational script between User and Sahayak (approx 30s) in ${language}",
  "steps": ["Step 1", "Step 2"] (if applicable),
  "documents": ["Aadhaar", "Pan Card"] (list of required docs if applicable),
  "action_items": ["Find Hospital", "Call 108"] (suggested next buttons)
}

Example Input (Hindi): "Mujhe bukhar hai, hospital chahiye" have to find hospital
Example Output:
{
  "intent": "service",
  "main_response": "Agar aapko tez bukhar hai, toh turant doctor ko dikhana chahiye. Aapke paas ke sarkari aur private hospitals ki list yahan hai.",
  "short_summary": "Nazdeeki hospitals ki list di gayi hai.",
  "podcast_script": "User: Mujhe bukhar hai. Sahayak: Namaste. Chinta na karein. Maine aapke liye nazdeeki hospitals ki list nikaali hai. Kya aap ambulance chahte hain?",
  "steps": ["Location share karein", "Hospital chunein", "Call karein"],
  "documents": ["Aadhaar Card", "Insurance Card"],
  "action_items": ["Find Hospital"]
}
`;

        // We prepend the system prompt to the message because Gemini Pro (free) works best this way or via systemInstruction if available in the SDK version.
        // For safety, we'll combine them.
        const result = await chat.sendMessage(`${SYSTEM_PROMPT}\n\nUser Input: ${text}`);
        const response = result.response;
        const textResponse = response.text();

        // Clean up markdown code blocks if present
        const cleanJson = textResponse.replace(/```json\n?|\n?```/g, "").trim();

        return JSON.parse(cleanJson);
    } catch (error) {
        console.error("AI Service Error:", error);
        return {
            intent: "info",
            main_response: "Sorry, I am having trouble processing that.",
            short_summary: "Error processing request",
            podcast_script: "Assistant: Sorry, I encountered an error.",
            steps: [],
            action_items: []
        };
    }
};

const actionTemplates: Record<string, string> = {
    "healthcare": "User needs medical help. Find hospitals, clinics, or ambulance services. Focus on urgency.",
    "education": "User is asking about schools, scholarships, or courses. Provide list of nearby institutions or schemes like PM Vidya.",
    "jobs": "User is looking for employment. List nearby job centers, MNREGA schemes, or skill training centers.",
    "legal": "User needs legal aid. Direct to District Legal Services Authority or free legal aid clinics.",
    "government": "User needs government documents (Aadhaar, Ration card). Explain the application process and required documents.",
    "transport": "User needs bus/train info. Provide nearest stops and general schedules.",
    "emergency": "CRITICAL: User is in danger. IMMEDIATELY suggest calling 100/108/112 and sharing location."
};

export const generateActionResponse = async ({ actionId, text, language, history = [] }: { actionId: string, text: string, language: string, history?: any[] }) => {
    const template = actionTemplates[actionId.toLowerCase()] || "Help the user with their request.";
    const contextPrompt = `
    CONTEXT: User clicked Quick Action "${actionId}".
    GOAL: ${template}
    USER INPUT (if any): ${text}
    `;

    // Reuse the main chat generation but with specific context
    return generateResponse({
        text: contextPrompt,
        language,
        history
    });
};
