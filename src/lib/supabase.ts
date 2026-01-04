import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isValidUrl = (url: string) => {
    try {
        return url.startsWith("http");
    } catch (e) {
        return false;
    }
};

// Fallback to a valid-looking URL if env var is missing/placeholder to prevent crash
const validUrl = isValidUrl(supabaseUrl) ? supabaseUrl : "https://placeholder.supabase.co";
const validKey = supabaseAnonKey || "placeholder";

export const supabase = createClient(validUrl, validKey);
