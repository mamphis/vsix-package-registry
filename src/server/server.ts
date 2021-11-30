import express, { Application } from 'express';

export class Server {
    private app: Application;

    constructor(private port: number) {
        this.app = express();
    }

    init() {
    }

    start() {
        this.app.listen(() => {
            console.log(`Server startet listening on port ${this.port}`);
        });
    }
}