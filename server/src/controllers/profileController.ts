import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.userId as string;

        if (!userId) {
            res.status(400).json({ error: "User ID required" });
            return;
        }

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error && error.code !== "PGRST116") { // Ignore 'not found' error for new users
            throw error;
        }

        res.json(data || {});
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, full_name, language_code, emergency_contacts, email, phone } = req.body;

        if (!userId) {
            res.status(400).json({ error: "User ID required" });
            return;
        }

        const updates: any = {
            id: userId,
            updated_at: new Date().toISOString()
        };

        if (full_name) updates.full_name = full_name;
        if (language_code) updates.language_code = language_code;
        if (emergency_contacts) updates.emergency_contacts = emergency_contacts;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;

        const { data, error } = await supabase
            .from("profiles")
            .upsert(updates)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
};
