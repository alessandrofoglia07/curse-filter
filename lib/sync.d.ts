import { DetectOptions, FilterOptions } from './utils.js';
/**
 * Filters a string for profanity. It replaces profanity with "`***`".
 * @param str String to filter
 * @param options Options for filtering
 * @returns Filtered string
 * @example
 * filter('fuck you') // '*** you'
 * filter('fuck you', { lang: 'en' }) // '*** you'
 * filter('fuck you, coglione', { lang: ['en', 'it'] }) // '*** you, ***'
 */
export declare const filter: (str: string, options?: FilterOptions) => string;
/**
 * Detects profanity in a string.
 * @param str String to detect profanity in
 * @param options Options for detection
 * @returns `true` if profanity is detected, otherwise `false`
 * @example
 * detect('Fuck you') // true
 * detect('Fuckyou') // false
 * detect('Fuckyou', { rigidMode: true }) // true
 */
export declare const detect: (str: string, options?: DetectOptions) => boolean;
