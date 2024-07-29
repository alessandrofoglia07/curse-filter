type Keywords = (string | string[] | string[][])[];
export interface KeywordsSet<T> extends Set<T> {
    addKeywords(...keywords: Keywords): void;
}
export interface KeywordsSetConstructor {
    new <T = any>(values?: readonly T[] | null): KeywordsSet<T>;
    readonly prototype: KeywordsSet<any>;
}
/**
 * Set of custom keywords to use in addition to the default ones
 * @example
 * CustomKeywords.add('foo');
 * CustomKeywords.addKeywords('foo', 'bar');
 * CustomKeywords.delete('foo');
 */
export declare const CustomKeywords: KeywordsSet<string>;
export declare const langs: Map<string, string[]>;
/**
 * List of supported languages
 * @example ['en', 'fr', ...]
 */
export declare const supportedLangs: SupportedLang[];
/**
 * Supported language type
 * @example const english: SupportedLang = 'en'
 * const french: SupportedLang = 'fr'
 */
export type SupportedLang = 'af' | 'cz' | 'de' | 'en' | 'es' | 'fi' | 'fr' | 'hi' | 'it' | 'nl' | 'pl' | 'ru' | 'sk' | 'th' | 'uk';
/**
 * Removes excess letters followed or preceded by "***" in a string.
 */
export declare const removeExcess: (str: string, placeholder?: string) => string;
export interface Options {
    /**
     * Language to use. Use `true` or `undefined` to use all languages, or a language / array of languages to use.
     * @default true
     */
    lang?: SupportedLang | SupportedLang[] | true;
}
export interface FilterOptions extends Options {
    /**
     * Placeholder to use instead of "***"
     * @default '***'
     * @example
     * await filter('Fuck you', { placeholder: 'myString' }) // 'myString you'
     */
    placeholder?: string;
}
export interface DetectOptions extends Options {
    /**
     * Whether to use the "rigid" mode, which is more strict
     * @default false
     * @example
     * await detect('Fuckyou') // false
     * await detect('Fuckyou', { rigidMode: true }) // true
     */
    rigidMode?: boolean;
    /**
     * Amount of chunk of words processed on every iteration. Adjust this based on your application's performance characteristics.
     * @default 100
     */
    processedChunkSize?: number;
}
export {};
