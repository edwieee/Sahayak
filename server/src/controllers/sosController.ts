import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const handleSOS = async (req: Request, res: Response) => {
    try {
        const { location, phoneNumber, userId } = req.body;

        console.log(`[SOS ALERT] User ${phoneNumber || userId} at ${JSON.stringify(location)}`);
        console.log(`[SMS MOCK] Sending helping message to Emergency Contacts...`);

        // Log to Supabase if userId is present
        if (userId) {
            const { error } = await supabase.from("sos_logs").insert({
                user_id: userId,
                location: location,
                status: "triggered",
                notified_contacts: ["Police", "Ambulance"] // Mock contacts
            });

            if (error) console.error("Failed to log SOS", error);
        }

        res.json({
            status: "alert_sent",
            message: "Emergency Assistance Dispatched",
            eta: "10 mins"
        });
    } catch (error) {
        console.error("SOS Error:", error);
        res.status(500).json({ error: "Failed to process SOS" });
    }
};
