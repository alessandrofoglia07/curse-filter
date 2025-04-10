import { Request, Response, NextFunction } from 'express';
import { detect } from '../index.js';
import { MiddlewaresConfig } from './middlewaresConfig.js';

/**
 * Middleware to detect curse words in `req.body`.
 *
 * On profanity detection (in any string of the body object), it sends a response with the error message and the error code.
 *
 * For configuration, see {@link MiddlewaresConfig}.
 */
export const detectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const check = async (obj: unknown) => {
        if (Array.isArray(obj)) {
            obj.forEach((item) => {
                check(item);
            });
        } else if (typeof obj === 'string') {
            const detection = await detect(obj, { ...MiddlewaresConfig.detectOptions });
            if (detection) {
                if (typeof MiddlewaresConfig.onError === 'function') {
                    MiddlewaresConfig.onError();
                }
                const msg = MiddlewaresConfig.errorMessage;
                res.status(MiddlewaresConfig.errorCode).json({ error: msg, message: msg, ok: false });
                return false;
            }
        } else if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach((item) => {
                check(item);
            });
        } else {
            return true;
        }
    };

    const ok = await check(body);

    if (ok) next();
};
