import { SupportedLang, langs, removeExcess } from './utils.js';

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
export const filter = (str: string, select?: SupportedLang | SupportedLang[] | true, placeholder: string = '***') => {
    let result = str;
    let searchString: RegExp;
    const regexArr: string[] = [];

    if (select === undefined || typeof select === 'boolean') {
        langs.forEach((arr) => {
            regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        });
    } else if (typeof select === 'string') {
        const arr = langs.get(select);
        if (arr) {
            regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        } else {
            throw new Error(`Language '${select}' is not supported`);
        }
    } else if (select.length > 0) {
        select.forEach((lang) => {
            const arr = langs.get(lang);
            if (arr) {
                regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
            } else {
                throw new Error(`Language '${lang}' is not supported`);
            }
        });
    } else {
        throw new Error('No language selected');
    }
    if (regexArr.length > 0) {
        searchString = new RegExp(regexArr.join('|'), 'gi');
        result = removeExcess(result.replace(searchString, placeholder), placeholder);
    }
    return result;
};

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
export const detect = (str: string, select?: SupportedLang | SupportedLang[] | true, options?: { rigidMode?: boolean }): boolean => {
    let arr: string[] = [];

    if (select === undefined || typeof select === 'boolean') {
        arr = ([] as string[]).concat(...[...langs.values()]);
    } else if (typeof select === 'string') {
        arr = langs.get(select) || [];
    } else if (select.length > 0) {
        arr = ([] as string[]).concat(...select.map((lang) => langs.get(lang) || []));
    } else {
        throw new Error('No language selected');
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
