import { langs, removeExcess, SupportedLang, CustomKeywords } from './utils.js';

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
export const filter = async (str: string, select?: SupportedLang | SupportedLang[] | true, placeholder: string = '***'): Promise<string> => {
    let result = str;
    let searchString: RegExp;
    const regexArr: string[] = [];

    // If no language is specified, select all languages
    if (select === undefined || typeof select === 'boolean') {
        langs.forEach((arr) => {
            // for each language, add every word, converted to regex, to regex array
            regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        });
    } else if (typeof select === 'string') {
        // If a single language is specified, select it
        const arr = langs.get(select);
        if (arr) {
            // add every bad word of a language to regex array
            regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        } else {
            throw new Error(`Language '${select}' is not supported`);
        }
    } else if (select.length > 0) {
        // If an array of languages is specified, select them
        select.forEach((lang) => {
            const arr = langs.get(lang);
            if (arr) {
                // for each language, add every word, converted to regex, to regex array
                regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
            } else {
                throw new Error(`Language '${lang}' is not supported`);
            }
        });
    } else {
        throw new Error('No language selected');
    }

    if (CustomKeywords.size > 0) {
        regexArr.push(
            Array.from(CustomKeywords)
                .map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'))
                .join('|')
        );
    }

    // Create a RegExp object with the selected languages
    searchString = new RegExp(regexArr.join('|'), 'gi');
    // Replace all instances of the selected languages with the placeholder
    result = removeExcess(result.replace(searchString, placeholder), placeholder);
    return result;
};

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
export const detect = async (str: string, select?: SupportedLang | SupportedLang[] | true, options?: { rigidMode?: boolean }): Promise<boolean> => {
    let arr: string[] = [];

    if (select === undefined || typeof select === 'boolean') {
        arr = ([] as string[]).concat(...langs.values());
    } else if (typeof select === 'string') {
        arr = langs.get(select) || [];
    } else if (select.length > 0) {
        arr = ([] as string[]).concat(...select.map((lang) => langs.get(lang) || []));
    } else {
        throw new Error('No language selected');
    }

    if (CustomKeywords.size > 0) {
        arr = [...arr, ...Array.from(CustomKeywords)];
    }

    if (options && options.rigidMode) {
        return arr.some((word) => str.toLowerCase().includes(word.toLowerCase()));
    } else {
        return arr.some((word) => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(str);
        });
    }
};
