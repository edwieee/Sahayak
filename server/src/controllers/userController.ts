import { Request, Response } from 'express';
import db from '../db';

export const trackActivity = (req: Request, res: Response) => {
    const { content_id, status } = req.body;
    const userId = (req as any).user.user_id;

    try {
        // Check if exists
        const existing = db.prepare('SELECT * FROM user_activity WHERE user_id = ? AND content_id = ? AND status = ?').get(userId, content_id, status);

        if (existing) {
            db.prepare('UPDATE user_activity SET last_viewed_at = CURRENT_TIMESTAMP WHERE activity_id = ?').run((existing as any).activity_id);
        } else {
            db.prepare('INSERT INTO user_activity (user_id, content_id, status) VALUES (?, ?, ?)').run(userId, content_id, status);
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Activity tracking failed' });
    }
};

export const getUserDashboard = (req: Request, res: Response) => {
    const userId = (req as any).user.user_id;

    try {
        const saved = db.prepare('SELECT content_id, last_viewed_at FROM user_activity WHERE user_id = ? AND status = "saved"').all(userId);
        const viewed = db.prepare('SELECT content_id, last_viewed_at FROM user_activity WHERE user_id = ? AND status = "viewed" ORDER BY last_viewed_at DESC LIMIT 10').all(userId);
        const user = db.prepare('SELECT username, email, phone, preferred_language, latitude, longitude FROM users WHERE user_id = ?').get(userId);

        res.json({ saved, viewed, user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard' });
    }
};
