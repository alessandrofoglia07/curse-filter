import { SupportedLang } from '../utils';

/**
 * @class MiddlewaresConfig
 * @description
 * This class is used to configure the middlewares for express.js.
 */
export class MiddlewaresConfig {
    /**
     * @property `onError`
     * @description
     * Function to be called when a not allowed content is detected, before sending the response.
     * @default null
     */
    public static onError: () => void | null;

    /**
     * @property `detectOptions`
     * @description
     * Options to be passed to the `detect` function of middlewares.
     * @default {} // (no specific options are passed)
     */
    public static detectOptions: {
        select?: SupportedLang[] | SupportedLang | true;
        options?: {
            rigidMode?: boolean;
        };
    } = {};

    /**
     * @property `errorMessage`
     * @description
     * Error message to be sent in response when a not allowed content is detected.
     * @default 'Not allowed content detected.'
     */
    public static errorMessage: string = 'Not allowed content detected.';

    /**
     * @property `errorCode`
     * @description
     * Error code to be sent in response when a not allowed content is detected.
     * @default 422
     * @see [status codes](https://developer.mozilla.org/en-US/docs/web/http/status)
     * @see [code 422](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422)
     */
    public static errorCode: number = 422;
}
