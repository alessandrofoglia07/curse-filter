const langCache = new Map<string, string[]>();

export const loadLang = async (lang: SupportedLang): Promise<string[]> => {
    if (langCache.has(lang)) {
        return langCache.get(lang) as string[];
    }
    if (!supportedLangs.includes(lang)) {
        throw new Error(`Language '${lang}' is not supported`);
    }
    const module = await import(`./langs/${lang}.js`);
    if (!module.default) {
        throw new Error(`Language '${lang}' is not supported`);
    }
    langCache.set(lang, module.default);
    return module.default;
};

export const loadLangSync = (lang: SupportedLang): string[] => {
    if (langCache.has(lang)) {
        return langCache.get(lang) as string[];
    }
    if (!supportedLangs.includes(lang)) {
        throw new Error(`Language '${lang}' is not supported`);
    }
    const module = require(`./langs/${lang}.js`);
    if (!module.default) {
        throw new Error(`Language '${lang}' is not supported`);
    }
    langCache.set(lang, module.default);
    return module.default;
};

/**
 * List of supported languages
 */
export const supportedLangs: SupportedLang[] = ["af", "cz", "de", "en", "es", "fi", "fr", "hi", "it", "nl", "pl", "ru", "sk", "th", "uk"] as SupportedLang[];

/**
 * Supported language type
 * @example const english: SupportedLang = 'en'
 * const french: SupportedLang = 'fr'
 */
export type SupportedLang = 'af' | 'cz' | 'de' | 'en' | 'es' | 'fi' | 'fr' | 'hi' | 'it' | 'nl' | 'pl' | 'ru' | 'sk' | 'th' | 'uk';

/**
 * Removes excess letters followed or preceded by "***" in a string.
 */
export const removeExcess = (str: string, placeholder: string = '***'): string => {
    // Regular expression to match letters before and after "***"
    const regex = /([A-Za-z]+)?\*\*\*([A-Za-z]+)?/g;
    return str.replace(regex, placeholder);
};

export interface Options {
    /**
     * Language to use. Use `undefined` to use all languages, or select a language / array of languages to use.
     * @default undefined
     */
    lang?: SupportedLang | SupportedLang[];
    /**
     * Custom Set of words to look for.
     * @example
     * const customKeywords = new Set(['customWord1', 'customWord2']);
     * await filter('customWord1', { customKeywords }) // '***'
     */
    customKeywords?: Set<string>;
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
    /**
     * Custom Set of words to look for.
     * @example
     * const customKeywords = new Set(['customWord1', 'customWord2']);
     * await filter('customWord1', { customKeywords }) // '***'
     */
    customKeywords?: Set<string>;
}
