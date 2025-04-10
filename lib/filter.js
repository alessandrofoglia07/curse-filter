var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { removeExcess, supportedLangs, loadLang } from './utils.js';
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
export const filter = (str, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let result = str;
    let searchString;
    const regexArr = [];
    const lang = options === null || options === void 0 ? void 0 : options.lang;
    const customKeywords = options === null || options === void 0 ? void 0 : options.customKeywords;
    const placeholder = (_a = options === null || options === void 0 ? void 0 : options.placeholder) !== null && _a !== void 0 ? _a : '***';
    const escapeRegExp = (word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    const langsToLoad = lang === undefined ? supportedLangs : typeof lang === 'string' ? [lang] : lang;
    for (const l of langsToLoad) {
        const arr = yield loadLang(l);
        regexArr.push(arr.map(escapeRegExp).join('|'));
    }
    if (customKeywords && customKeywords.size > 0) {
        regexArr.push(Array.from(customKeywords)
            .map((word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'))
            .join('|'));
    }
    if (regexArr.length > 0) {
        // Create a RegExp object with the selected languages
        searchString = new RegExp(regexArr.join('|'), 'gi');
        // Replace all instances of the selected languages with the placeholder
        result = removeExcess(result.replace(searchString, placeholder), placeholder);
    }
    return result;
});
//# sourceMappingURL=filter.js.map