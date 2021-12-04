import { User } from "../model/user";
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
                const userInfo = await GitApi.the.getUserInfo(token);
                if (userInfo.login !== username) {
                    return false;
                }

                await database.user.create(Object.assign(new User(), { username, origin, name: userInfo.name }));

                return true;
            } catch {
                return false;
            }
        } else {
            try {
                const userInfo = await GitApi.the.getUserInfo(token);
                if (userInfo.login !== username) {
                    return false;
                }
            } catch {
                return false;
            }
            return true;
        }
    }

    async getUser(origin: string, username: string): Promise<User> {
        const id = `${origin}:${username}`;
        if (!await database.user.exists(id)) {
            throw new Error(`User ${id} does not exist.`)
        }

        return await database.user.get(id) as User;
    }
}