import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'sahayak_secret_key_123';

export const register = async (req: Request, res: Response) => {
    const { username, password, email, phone, language } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (username, password_hash, email, phone, preferred_language) VALUES (?, ?, ?, ?, ?)');
        const info = stmt.run(username, passwordHash, email, phone, language);

        res.status(201).json({ user_id: info.lastInsertRowid, username });
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
        const user = stmt.get(username) as any;

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ user_id: user.user_id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                language: user.preferred_language
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

export const updateLocation = (req: Request, res: Response) => {
    const { lat, lng } = req.body;
    const userId = (req as any).user.user_id;

    try {
        const stmt = db.prepare('UPDATE users SET latitude = ?, longitude = ? WHERE user_id = ?');
        stmt.run(lat, lng, userId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Location update failed' });
    }
};
