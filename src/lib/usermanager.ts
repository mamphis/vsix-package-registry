import { database } from "../server";
import { GitApi } from "./gitapi";

export class UserManager {
    private static instance: UserManager;

    static get the() {
        if (!this.instance) {
            this.instance = new UserManager();
        }

        return this.instance;
    }

    private constructor() { }

    async checkUser(origin: string, username: string, token: string): Promise<boolean> {
        if (!await database.user.exists(`${origin}:${username}`)) {
            try {
                const userInfo = GitApi.the.getUserInfo(token);
                
            } catch {
                return false;
            }
        }


        return false;
    }
}