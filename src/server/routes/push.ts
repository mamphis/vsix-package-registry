import { NextFunction, Request, Response, Router } from "express";
import { auth } from "../middleware/auth";
import multer from 'multer';
import createHttpError from "http-errors";
import { User } from "../../model/user";
import { readFile } from "fs/promises";
import { VsixManager } from "../../lib/vsixmanager";

const router = Router();

// Only accept authenitcated requests
router.use(auth());

// use multer to handle formdata file uploads
const upload = multer({ dest: 'temp/' });
router.use(upload.single('vsix'));

// Handle upload of vsix
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next(createHttpError(400, 'Missing vsix file.'));
    }

    const user = res.locals.user as User;
    try {
        const vsixBuffer = await readFile(req.file.path);
        const vsix = await VsixManager.the.parseVsixData(vsixBuffer);
        vsix.owner = user;

        return res.json(await VsixManager.the.store(req.file, vsix));
    } catch (e: any) {
        return next(createHttpError(500, e));
    }
});


export default router;