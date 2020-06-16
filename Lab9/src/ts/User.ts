import bcrypt from "bcrypt";
import * as sqlite from "sqlite3";
import {DbHandlerOpen, DbHandlerAll, DbHandlerRun, DbHandlerGet} from "./DBWrapper"

export class User {
    public hashPassword(password : string) {
        return bcrypt.hash(password, 10);
    }

    public async addUser(db : sqlite.Database, id : number, username : string, password : string): Promise<any> {
        return DbHandlerRun(db,
            "INSERT OR REPLACE INTO users (id, username, password) VALUES (?, ?, ?);",
            [id, username, await this.hashPassword(password)]);
    }

    public getUser(db : sqlite.Database, username : string, password : string): Promise<boolean> {
        return DbHandlerGet(db, "SELECT username, password FROM users WHERE username = ?;", [username])
        .then(async (row : any) => {
            if (row) {
                return await bcrypt.compare(password, row.password);
            }

            return false;
        });
    }
}