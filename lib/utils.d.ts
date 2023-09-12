export interface KeywordsSet<T> extends Set<T> {
    addKeywords(...keywords: string[] | string[][]): void;
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
