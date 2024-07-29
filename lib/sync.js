import { langs, removeExcess, CustomKeywords } from './utils.js';
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
export const filter = (str, options) => {
    var _a;
    let result = str;
    let searchString;
    const escapeRegExp = (word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    const regexArr = [];
    const lang = options === null || options === void 0 ? void 0 : options.lang;
    const placeholder = (_a = options === null || options === void 0 ? void 0 : options.placeholder) !== null && _a !== void 0 ? _a : '***';
    if (lang === undefined || lang === true) {
        for (const arr of langs.values()) {
            regexArr.push(arr.map(escapeRegExp).join('|'));
        }
    } else if (typeof lang === 'string') {
        const arr = langs.get(lang);
        if (!arr) throw new Error(`Language '${lang}' is not supported`);
        regexArr.push(arr.map(escapeRegExp).join('|'));
    } else if (lang.length > 0) {
        for (const el of lang) {
            const arr = langs.get(el);
            if (!arr) throw new Error(`Language '${el}' is not supported`);
            regexArr.push(arr.map(escapeRegExp).join('|'));
        }
    } else {
        throw new Error('No language selected');
    }
    if (CustomKeywords.size > 0) {
        regexArr.push(Array.from(CustomKeywords).map(escapeRegExp).join('|'));
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
 * @param options Options for detection
 * @returns `true` if profanity is detected, otherwise `false`
 * @example
 * detect('Fuck you') // true
 * detect('Fuckyou') // false
 * detect('Fuckyou', { rigidMode: true }) // true
 */
export const detect = (str, options) => {
    let arr = [];
    const lang = options === null || options === void 0 ? void 0 : options.lang;
    if (lang === undefined || typeof lang === 'boolean') {
        arr = [].concat(...langs.values());
    } else if (typeof lang === 'string') {
        arr = langs.get(lang) || [];
    } else if (lang.length > 0) {
        arr = [].concat(...lang.map((el) => langs.get(el) || []));
    } else {
        throw new Error('No language selected');
    }
    if (CustomKeywords.size > 0) {
        arr = [...arr, ...Array.from(CustomKeywords)];
    }
    if (options === null || options === void 0 ? void 0 : options.rigidMode) {
        return arr.some((word) => str.toLowerCase().includes(word.toLowerCase()));
    } else {
        return arr.some((word) => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(str);
        });
    }
};
//# sourceMappingURL=sync.js.map
