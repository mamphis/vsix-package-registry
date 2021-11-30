import axios, { AxiosResponse } from 'axios';

export type GitUserInfo = {
    login: string,
    name: string,
};

export class GitApi {
    private static instance: GitApi;

    static get the() {
        if (!this.instance) {
            this.instance = new GitApi();
        }

        return this.instance;
    }

    private constructor() {
    }

    async getUserInfo(token: string): Promise<GitUserInfo> {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${token}`,
            },
        });

        return response.data;
    }
}