var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
import { langs, removeExcess, CustomKeywords } from './utils.js';
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
export const filter = (str, options) =>
    __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let result = str;
        let searchString;
        const regexArr = [];
        const lang = options === null || options === void 0 ? void 0 : options.lang;
        const placeholder = (_a = options === null || options === void 0 ? void 0 : options.placeholder) !== null && _a !== void 0 ? _a : '***';
        const escapeRegExp = (word) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
        const processLanguages = () =>
            __awaiter(void 0, void 0, void 0, function* () {
                // If no language is specified, select all languages
                if (lang === undefined || lang === true) {
                    for (const arr of langs.values()) {
                        // for each language, add every word, converted to regex, to regex array
                        regexArr.push(arr.map(escapeRegExp).join('|'));
                        yield new Promise((resolve) => setTimeout(resolve, 0)); // Yield control
                    }
                } else if (typeof lang === 'string') {
                    // If a single language is specified, select it
                    const arr = langs.get(lang);
                    if (!arr) throw new Error(`Language '${lang}' is not supported`);
                    // add every bad word of a language to regex array
                    regexArr.push(arr.map(escapeRegExp).join('|'));
                } else if (lang.length > 0) {
                    // If an array of languages is specified, select them
                    for (const el of lang) {
                        const arr = langs.get(el);
                        if (!arr) throw new Error(`Language '${el}' is not supported`);
                        // for each language, add every word, converted to regex, to regex array
                        regexArr.push(arr.map(escapeRegExp).join('|'));
                    }
                } else {
                    throw new Error('No language selected');
                }
            });
        yield processLanguages();
        if (CustomKeywords.size > 0) {
            regexArr.push(
                Array.from(CustomKeywords)
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
    });
/**
 * *Async version* of `detect()` function. Detects profanity in a string.
 * @param str String to detect profanity in
 * @param options Options for detection
 * @returns `true` if profanity is detected, otherwise `false`
 * @example
 * // in async scope
 * await detect('Fuck you') // true
 * await detect('Fuckyou') // false
 * await detect('Fuckyou', { rigidMode: true }) // true
 */
export const detect = (str, options) =>
    __awaiter(void 0, void 0, void 0, function* () {
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
        const checkWord = (word) =>
            __awaiter(void 0, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    if (options === null || options === void 0 ? void 0 : options.rigidMode) {
                        resolve(str.toLowerCase().includes(word.toLowerCase()));
                    } else {
                        const regex = new RegExp(`\\b${word}\\b`, 'i');
                        resolve(regex.test(str));
                    }
                });
            });
        const CHUNK_SIZE = (options === null || options === void 0 ? void 0 : options.processedChunkSize) || 100;
        for (let i = 0; i < arr.length; i += CHUNK_SIZE) {
            const chunk = arr.slice(i, i + CHUNK_SIZE);
            const promises = chunk.map(checkWord);
            const results = yield Promise.all(promises);
            if (results.includes(true)) return true;
            yield new Promise((resolve) => setTimeout(resolve, 0)); // Yield control
        }
        return false;
    });
//# sourceMappingURL=promises.js.map
