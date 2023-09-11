var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { langs, removeExcess } from './utils.js';
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
export const filter = (str, select, placeholder = '***') => __awaiter(void 0, void 0, void 0, function* () {
    let result = str;
    let searchString;
    const regexArr = [];
    if (select === undefined || typeof select === 'boolean') {
        langs.forEach((arr) => {
            regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        });
    }
    else if (typeof select === 'string') {
        const arr = langs.get(select);
        if (arr) {
            regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        }
        else {
            throw new Error(`Language '${select}' is not supported`);
        }
    }
    else if (select.length > 0) {
        select.forEach((lang) => {
            const arr = langs.get(lang);
            if (arr) {
                regexArr.push(arr.map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
            }
            else {
                throw new Error(`Language '${lang}' is not supported`);
            }
        });
    }
    else {
        throw new Error('No language selected');
    }
    searchString = new RegExp(regexArr.join('|'), 'gi');
    result = removeExcess(result.replace(searchString, placeholder), placeholder);
    return result;
});
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
export const detect = (str, select, options) => __awaiter(void 0, void 0, void 0, function* () {
    let arr = [];
    if (select === undefined || typeof select === 'boolean') {
        arr = [].concat(...[...langs.values()]);
    }
    else if (typeof select === 'string') {
        arr = langs.get(select) || [];
    }
    else if (select.length > 0) {
        arr = [].concat(...select.map((lang) => langs.get(lang) || []));
    }
    else {
        throw new Error('No language selected');
    }
    if (options && options.rigidMode) {
        return arr.some((word) => str.toLowerCase().includes(word.toLowerCase()));
    }
    else {
        return arr.some((word) => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(str);
        });
    }
});
