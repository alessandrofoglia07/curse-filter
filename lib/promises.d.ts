import { SupportedLang } from './utils';
/**
 * *Async version* of `filter()` function. Filters a string for profanity. It replaces profanity with "`***`".
 * @param str String to filter
 * @param select `true` or `undefined` to use all languages, or a language / array of languages to use
 * @param placeholder Placeholder to use instead of "***"
 * @returns Filtered string
 * @example
 * // in async scope
 * await filter('fuck you') // '*** you'
 * await filter('fuck you', 'en') // '*** you'
 * await filter('fuck you, coglione', ['en', 'it']) // '*** you, ***'
 */
export declare const filter: (str: string, select?: SupportedLang | SupportedLang[] | true, placeholder?: string) => Promise<string>;
/**
 * *Async version* of `detect()` function. Detects profanity in a string.
 * @param str String to detect profanity in
 * @param select `true` or `undefined` to use all languages, or a language / array of languages to use
 * @param options Options for detection
 * @returns `true` if profanity is detected, otherwise `false`
 * @example
 * // in async scope
 * await detect('Fuck you') // true
 * await detect('Fuckyou') // false
 * await detect('Fuckyou', true, { rigidMode: true }) // true
 */
export declare const detect: (str: string, select?: SupportedLang | SupportedLang[] | true, options?: {
    rigidMode?: boolean;
}) => Promise<boolean>;
