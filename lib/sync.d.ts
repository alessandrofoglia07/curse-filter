import { SupportedLang } from './utils';
/**
 * Filters a string for profanity. It replaces profanity with "`***`".
 * @param str String to filter
 * @param select `true` or `undefined` to use all languages, or a language / array of languages to use
 * @param placeholder Placeholder to use instead of "***"
 * @returns Filtered string
 * @example filter('fuck you') // '*** you'
 * filter('fuck you', 'en') // '*** you'
 * filter('fuck you, coglione', ['en', 'it']) // '*** you, ***'
 */
export declare const filter: (str: string, select?: SupportedLang | SupportedLang[] | true, placeholder?: string) => string;
/**
 * Detects profanity in a string.
 * @param str String to detect profanity in
 * @param select `true` or `undefined` to use all languages, or a language / array of languages to use
 * @param options Options for detection
 * @returns `true` if profanity is detected, otherwise `false`
 * @example detect('Fuck you') // true
 * detect('Fuckyou') // false
 * detect('Fuckyou', true, { rigidMode: true }) // true
 */
export declare const detect: (
    str: string,
    select?: SupportedLang | SupportedLang[] | true,
    options?: {
        rigidMode?: boolean;
    }
) => boolean;
