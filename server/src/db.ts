import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

const db = new Database('sahayak.db');

export const initDb = () => {
    const schema = readFileSync(join(process.cwd(), 'db_schema_v3.sql'), 'utf-8');
    db.exec(schema);
};

export default db;
