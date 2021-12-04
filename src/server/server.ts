import express, { Application, NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import moment from 'moment';
import push from './routes/push';

export class Server {
    private app: Application;

    constructor(private port: number) {
        this.app = express();
    }

    async init() {
        // Logger
        this.app.use(async (req: Request, res: Response, next: NextFunction) => {
            const start = moment();
            await next();
            const end = moment();

            console.log(`(${end.diff(start)}ms) [${req.method}] ${req.originalUrl} => ${res.statusCode} ${res.statusMessage} ${req.method === 'POST' ? JSON.stringify(req.body) : ''}`);
        });

        // Routes
        this.app.use('/upload', push);

        // Not found handler
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            return next(createHttpError(404));
        });

        // error handler
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            let statusToSend = 500;
            if ('status' in err) {
                statusToSend = err.status;
            }

            console.log(`(ERR)  [${req.method}] ${req.originalUrl} => ${statusToSend} ${err.message}`);
            res.status(statusToSend).json({ error: true, status: statusToSend, errorName: err.name, message: err.message });
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server startet listening on port ${this.port}`);
        });
    }
}