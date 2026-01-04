import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const updateJsonFile = (req: Request, res: Response) => {
    const { language, data } = req.body;

    try {
        const filePath = path.join(process.cwd(), `../public/data/languages/${language}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update JSON file' });
    }
};
