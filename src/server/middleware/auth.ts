import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from 'http-errors';
import { UserManager } from "../../lib/usermanager";

export function auth(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const [type, token] = req.headers.authorization.split(' ');
            const username = req.header('X-Username');
            if (!username) {
                return next(createHttpError(400, `Missing "X-Username" header in request.`));
            }

            switch (type) {
                case 'github':
                    const result = await UserManager.the.checkUser(type, username, token);
                    if (result) {
                        res.locals.user = await UserManager.the.getUser(type, username);
                        return next();
                    }
                    break;
                default:
                    return next(createHttpError(400, `Unknown authorization type "${type}"`));
            }
        }

        return next(createHttpError(401))
    };
}