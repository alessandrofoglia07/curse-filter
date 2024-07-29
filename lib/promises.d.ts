import { FilterOptions, DetectOptions } from './utils.js';
/**
 * *Async version* of `filter()` function. Filters a string for profanity. It replaces profanity with "`***`".
 * @param str String to filter
 * @param options Options for filtering
 * @returns Filtered string
 * @example
 * // in async scope
 * await filter('fuck you') // '*** you'
 * await filter('fuck you', { lang: 'en' }) // '*** you'
 * await filter('fuck you, coglione', { lang: ['en', 'it'] }) // '*** you, ***'
 */
export declare const filter: (str: string, options?: FilterOptions) => Promise<string>;
/**
 * *Async version* of `detect()` function. Detects profanity in a string.
 * @param str String to detect profanity in
 * @param options Options for detection
 * @returns `true` if profanity is detected, otherwise `false`
 * @example
 * // in async scope
 * await detect('Fuck you') // true
 * await detect('Fuckyou') // false
 * await detect('Fuckyou', { rigidMode: true }) // true
 */
export declare const detect: (str: string, options?: DetectOptions) => Promise<boolean>;
