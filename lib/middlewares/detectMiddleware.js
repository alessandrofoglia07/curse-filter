var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { detect } from '../index.js';
import { MiddlewaresConfig } from './middlewaresConfig.js';
/**
 * Middleware to detect curse words in `req.body`.
 *
 * On profanity detection (in any string of the body object), it sends a response with the error message and the error code.
 *
 * For configuration, see {@link MiddlewaresConfig}.
 */
export const detectMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const check = (obj) => __awaiter(void 0, void 0, void 0, function* () {
        if (Array.isArray(obj)) {
            obj.forEach((item) => {
                check(item);
            });
        }
        else if (typeof obj === 'string') {
            const detection = yield detect(obj, Object.assign({}, MiddlewaresConfig.detectOptions));
            if (detection) {
                if (typeof MiddlewaresConfig.onError === 'function') {
                    MiddlewaresConfig.onError();
                }
                const msg = MiddlewaresConfig.errorMessage;
                res.status(MiddlewaresConfig.errorCode).json({ error: msg, message: msg, ok: false });
                return false;
            }
        }
        else if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach((item) => {
                check(item);
            });
        }
        else {
            return true;
        }
    });
    const ok = yield check(body);
    if (ok)
        next();
});
//# sourceMappingURL=detectMiddleware.js.map