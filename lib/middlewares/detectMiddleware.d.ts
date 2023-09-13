import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to detect bad words in **request body**.
 *
 * On profanity detection (in any string of the body object), it sends a response with the error message and the error code.
 *
 * For configuration, see {@link MiddlewaresConfig}.
 */
export declare const detectMiddleware: (req: Request, res: Response, next: NextFunction) => void;
