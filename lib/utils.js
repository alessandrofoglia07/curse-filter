var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const langCache = new Map();
export const loadLang = (lang) => __awaiter(void 0, void 0, void 0, function* () {
    if (langCache.has(lang)) {
        return langCache.get(lang);
    }
    if (!supportedLangs.includes(lang)) {
        throw new Error(`Language '${lang}' is not supported`);
    }
    const module = yield import(`./langs/${lang}.js`);
    if (!module.default) {
        throw new Error(`Language '${lang}' is not supported`);
    }
    langCache.set(lang, module.default);
    return module.default;
});
export const loadLangSync = (lang) => {
    if (langCache.has(lang)) {
        return langCache.get(lang);
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
export const supportedLangs = ["af", "cz", "de", "en", "es", "fi", "fr", "hi", "it", "nl", "pl", "ru", "sk", "th", "uk"];
/**
 * Removes excess letters followed or preceded by "***" in a string.
 */
export const removeExcess = (str, placeholder = '***') => {
    // Regular expression to match letters before and after "***"
    const regex = /([A-Za-z]+)?\*\*\*([A-Za-z]+)?/g;
    return str.replace(regex, placeholder);
};
//# sourceMappingURL=utils.js.map