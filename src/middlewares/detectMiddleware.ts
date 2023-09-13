import { Request, Response, NextFunction } from 'express';
import { detect } from '../index';
import { MiddlewaresConfig } from './middlewaresConfig';

/**
 * Middleware to detect bad words in **request body**.
 *
 * On profanity detection (in any string of the body object), it sends a response with the error message and the error code.
 *
 * For configuration, see {@link MiddlewaresConfig}.
 */
export const detectMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    let ok = true;

    const check = (obj: unknown) => {
        if (Array.isArray(obj)) {
            obj.forEach((item) => {
                check(item);
            });
        } else if (typeof obj === 'string') {
            if (detect(obj, MiddlewaresConfig.detectOptions.select, MiddlewaresConfig.detectOptions.options)) {
                ok = false;
                if (typeof MiddlewaresConfig.onError === 'function') {
                    MiddlewaresConfig.onError();
                }
                const msg = MiddlewaresConfig.errorMessage;
                res.status(MiddlewaresConfig.errorCode).json({ error: msg, message: msg, ok: false });
                return;
            }
        } else if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach((item) => {
                check(item);
            });
        } else {
            return;
        }
    };

    check(body);

    if (ok) next();
};
