import { removeExcess, FilterOptions, supportedLangs, loadLang } from './utils.js';

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
export const filter = async (str: string, options?: FilterOptions): Promise<string> => {
    let result = str;
    let searchString: RegExp;
    const regexArr: string[] = [];

    const lang = options?.lang;
    const customKeywords = options?.customKeywords;
    const placeholder = options?.placeholder ?? '***';

    const escapeRegExp = (word: string) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

    const langsToLoad = lang === undefined ? supportedLangs : typeof lang === 'string' ? [lang] : lang;

    for (const l of langsToLoad) {
        const arr = await loadLang(l);
        regexArr.push(arr.map(escapeRegExp).join('|'));
    }

    if (customKeywords && customKeywords.size > 0) {
        regexArr.push(
            Array.from(customKeywords)
                .map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'))
                .join('|')
        );
    }

    if (regexArr.length > 0) {
        // Create a RegExp object with the selected languages
        searchString = new RegExp(regexArr.join('|'), 'gi');
        // Replace all instances of the selected languages with the placeholder
        result = removeExcess(result.replace(searchString, placeholder), placeholder);
    }

    return result;
};