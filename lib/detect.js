var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supportedLangs, loadLang } from './utils.js';
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
export const detect = (str, options) => __awaiter(void 0, void 0, void 0, function* () {
    let words = [];
    const lang = options === null || options === void 0 ? void 0 : options.lang;
    const customKeywords = options === null || options === void 0 ? void 0 : options.customKeywords;
    const langsToLoad = lang === undefined ? supportedLangs : typeof lang === 'string' ? [lang] : lang;
    for (const l of langsToLoad) {
        const arr = yield loadLang(l);
        words.push.apply(words, arr);
    }
    if (customKeywords && customKeywords.size > 0) {
        words = [...words, ...Array.from(customKeywords)];
    }
    const checkWord = (word) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            if (options === null || options === void 0 ? void 0 : options.rigidMode) {
                resolve(str.toLowerCase().includes(word.toLowerCase()));
            }
            else {
                const regex = new RegExp(`\\b${word}\\b`, 'i');
                resolve(regex.test(str));
            }
        });
    });
    const CHUNK_SIZE = (options === null || options === void 0 ? void 0 : options.processedChunkSize) || 100;
    for (let i = 0; i < words.length; i += CHUNK_SIZE) {
        const chunk = words.slice(i, i + CHUNK_SIZE);
        const promises = chunk.map(checkWord);
        const results = yield Promise.all(promises);
        if (results.includes(true))
            return true;
        yield new Promise((resolve) => setTimeout(resolve, 0)); // Yield control
    }
    return false;
});
//# sourceMappingURL=detect.js.map