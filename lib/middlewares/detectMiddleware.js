import { detect } from '../index.js';
import { MiddlewaresConfig } from './middlewaresConfig.js';
/**
 * Middleware to detect bad words in **request body**.
 *
 * On profanity detection (in any string of the body object), it sends a response with the error message and the error code.
 *
 * For configuration, see {@link MiddlewaresConfig}.
 */
export const detectMiddleware = (req, res, next) => {
    const { body } = req;
    let ok = true;
    const check = (obj) => {
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
