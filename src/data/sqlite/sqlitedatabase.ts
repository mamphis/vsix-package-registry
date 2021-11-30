import { createConnection } from "typeorm";
import { User } from "../../model/user";
import { BasicDAO } from "../basicdao";
import { Database, UserDAO } from "../database";

export class SqliteDatabase implements Database {
    user: UserDAO = new BasicDAO(User);

    constructor(private dataPath: string) {

    }

    async init(): Promise<void> {
        const connection = await createConnection({
            type: 'sqlite',
            database: this.dataPath,
            entities: [
                "out/model/**/*{.ts,.js}",
                // "src/model/**/*{.ts,.js}"
            ],
            logging: ['warn', 'error', 'info']
        });


        await connection.query('PRAGMA foreign_keys=OFF');
        await connection.synchronize(false);
        await connection.query('PRAGMA foreign_keys=ON');
    }
}