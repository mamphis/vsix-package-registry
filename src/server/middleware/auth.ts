import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from 'http-errors';

export function auth(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const [type, token] = req.headers.authorization.split(' ');

            switch (type) {
                case 'github':
                    
                default:
                    return next(createHttpError(400, `Unknown authorization type "${type}"`));
            }
        }

        return next(createHttpError(401))
    };
}