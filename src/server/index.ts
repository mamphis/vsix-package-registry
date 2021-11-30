import { Server } from "./server";
import { Database } from '../data/database';
import { SqliteDatabase } from "../data/sqlite/sqlitedatabase";

export let database: Database;

export async function start() {
    const port = parseInt(process.env.PORT ?? '4781');
    const sqliteDataPath = process.env.SQLITE_DATA_PATH ?? './data.sqlite';
    database = new SqliteDatabase(sqliteDataPath)
    await database.init();

    const server = new Server(port);
    await server.init();
    await server.start();
}

