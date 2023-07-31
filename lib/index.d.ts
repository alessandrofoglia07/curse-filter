/**
 * List of supported languages
 */
export declare const supportedLangs: SupportedLang[];
/**
 * Supported language type
 */
export type SupportedLang = 'af' | 'cz' | 'de' | 'en' | 'es' | 'fi' | 'fr' | 'hi' | 'it' | 'nl' | 'pl' | 'ru' | 'sk' | 'th' | 'uk';
/**
 * Filters a string for profanity
 * @param str String to filter
 * @param select Language to filter
 * @returns Filtered string
 */
export declare const filter: (str: string, select?: SupportedLang | SupportedLang[]) => string;
/**
 * Filters a string for profanity **asynchronously**
 * @param str String to filter
 * @param select Language to filter
 * @returns Promise that resolves to filtered string
 */
export declare const filterAsync: (str: string, select?: SupportedLang | SupportedLang[]) => Promise<string>;
/**
 * Detects profanity in a string
 * @param str String to detect profanity
 * @param select Language to detect
 * @returns Whether or not the string contains profanity
 */
export declare const detect: (str: string, select?: SupportedLang | SupportedLang[], options?: {
    rigidMode?: boolean;
}) => boolean;
