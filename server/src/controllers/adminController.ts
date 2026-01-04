import { Request, Response } from 'express';
import db from '../db';

export const updateContent = (req: Request, res: Response) => {
    const { content_id, language, summary } = req.body;

    try {
        // Log the update
        db.prepare('INSERT INTO content_update_log (content_id, language, update_summary) VALUES (?, ?, ?)').run(content_id, language, summary);

        // Find users who have saved or viewed this content
        const usersToNotify = db.prepare(`
            SELECT DISTINCT user_id 
            FROM user_activity 
            WHERE content_id = ?
        `).all(content_id);

        // Create notifications for each user
        const stmt = db.prepare('INSERT INTO notifications (user_id, content_id, message, channel) VALUES (?, ?, ?, ?)');

        usersToNotify.forEach((user: any) => {
            stmt.run(user.user_id, content_id, `Update: ${summary}`, 'app');
            // Simplified: In a real app, you'd also queue email/SMS here
        });

        res.json({ success: true, notified_count: usersToNotify.length });
    } catch (error) {
        res.status(500).json({ error: 'Content update failed' });
    }
};

export const getNotifications = (req: Request, res: Response) => {
    const userId = (req as any).user.user_id;

    try {
        const notifications = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC').all(userId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};
