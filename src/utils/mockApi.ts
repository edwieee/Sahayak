
const SLEEP_MS = 800;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for local storage
const getStorage = (key: string, fallback: any) => {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
};

const setStorage = (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
};

export const mockApi = {
    auth: {
        login: async (formData: any) => {
            await sleep(SLEEP_MS);
            // Simple mock: any password works
            const user = {
                user_id: 1,
                username: formData.username || "Guest User",
                email: formData.email || "guest@example.com",
                phone: formData.phone || "9876543210",
                language: formData.language || "en"
            };
            return {
                token: "mock-jwt-token",
                user
            };
        },
        register: async (formData: any) => {
            await sleep(SLEEP_MS);
            return { message: "Account created successfully" };
        }
    },
    user: {
        getDashboard: async () => {
            await sleep(SLEEP_MS);
            const saved = getStorage('sahayak_saved', []);
            const viewed = getStorage('sahayak_viewed', []);
            const user = getStorage('sahayak_user', { username: "Citizen", email: "citizen@example.com" });

            return {
                user,
                saved,
                viewed
            };
        },
        updateLocation: async (lat: number, lng: number) => {
            await sleep(SLEEP_MS);
            setStorage('sahayak_location', { lat, lng });
            return { success: true };
        },
        logActivity: async (content_id: string, status: 'viewed' | 'saved') => {
            // No sleep for background activity
            if (status === 'viewed') {
                let viewed = getStorage('sahayak_viewed', []);
                // Remove if exists to move to top
                viewed = viewed.filter((i: any) => i.content_id !== content_id);
                viewed.unshift({ content_id, last_viewed_at: new Date().toISOString() });
                setStorage('sahayak_viewed', viewed.slice(0, 10)); // Keep last 10
            } else if (status === 'saved') {
                let saved = getStorage('sahayak_saved', []);
                if (!saved.some((i: any) => i.content_id === content_id)) {
                    saved.push({ content_id, created_at: new Date().toISOString() });
                    setStorage('sahayak_saved', saved);
                }
            }
            return { success: true };
        },
        getNotifications: async () => {
            await sleep(SLEEP_MS);
            return getStorage('sahayak_notifications', [
                {
                    notification_id: 1,
                    message: "Welcome to Sahayak! We'll keep you updated on your interests.",
                    content_id: null,
                    created_at: new Date().toISOString()
                },
                {
                    notification_id: 2,
                    message: "PM-Kisan Eligibility criteria has been simplified for this month.",
                    content_id: "healthcare-001",
                    created_at: new Date(Date.now() - 86400000).toISOString()
                }
            ]);
        }
    },
    languages: {
        getSample: async (code: string) => {
            await sleep(500);
            return {
                text: "Welcome to One-Tap Sahayak. How can I help you today?",
                audio_url: null // Will trigger fallback TTS
            };
        }
    },
    admin: {
        updateContent: async (data: any) => {
            await sleep(1500);
            const notifications = getStorage('sahayak_notifications', []);
            notifications.unshift({
                notification_id: Date.now(),
                message: `Update: ${data.summary}`,
                content_id: data.content_id,
                created_at: new Date().toISOString()
            });
            setStorage('sahayak_notifications', notifications);
            return { notified_count: 42 };
        }
    }
};
