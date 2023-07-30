var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import af from './langs/af.js';
import cz from './langs/cz.js';
import de from './langs/de.js';
import en from './langs/en.js';
import es from './langs/es.js';
import fi from './langs/fi.js';
import fr from './langs/fr.js';
import hi from './langs/hi.js';
import it from './langs/it.js';
import nl from './langs/nl.js';
import pl from './langs/pl.js';
import ru from './langs/ru.js';
import sk from './langs/sk.js';
import th from './langs/th.js';
import uk from './langs/uk.js';
const langs = new Map([
    ['af', af],
    ['cz', cz],
    ['de', de],
    ['en', en],
    ['es', es],
    ['fi', fi],
    ['fr', fr],
    ['hi', hi],
    ['it', it],
    ['nl', nl],
    ['pl', pl],
    ['ru', ru],
    ['sk', sk],
    ['th', th],
    ['uk', uk],
]);
/**
 * List of supported languages
 */
export const supportedLangs = [...langs.keys()];
const removeExcess = (str) => {
    // Regular expression to match letters before and after "***"
    const regex = /([A-Za-z]+)?\*\*\*([A-Za-z]+)?/g;
    return str.replace(regex, '***');
};
/**
 * Filters a string for profanity
 * @param str String to filter
 * @param select Language to filter
 * @returns Filtered string
 */
export const filter = (str, select) => {
    let result = str;
    let searchString;
    const regexArr = [];
    if (select === undefined) {
        langs.forEach(arr => {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        });
    }
    else if (typeof select === 'string') {
        const arr = langs.get(select);
        if (arr) {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        }
        else {
            throw new Error(`Language '${select}' is not supported`);
        }
    }
    else if (select.length > 0) {
        select.forEach(lang => {
            const arr = langs.get(lang);
            if (arr) {
                regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
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
    result = removeExcess(result.replace(searchString, '***'));
    return result;
};
/**
 * Filters a string for profanity **asynchronously**
 * @param str String to filter
 * @param select Language to filter
 * @returns Promise that resolves to filtered string
 */
export const filterAsync = (str, select) => __awaiter(void 0, void 0, void 0, function* () {
    let result = str;
    let searchString;
    const regexArr = [];
    if (select === undefined) {
        langs.forEach(arr => {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        });
    }
    else if (typeof select === 'string') {
        const arr = langs.get(select);
        if (arr) {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        }
        else {
            throw new Error(`Language '${select}' is not supported`);
        }
    }
    else if (select.length > 0) {
        select.forEach(lang => {
            const arr = langs.get(lang);
            if (arr) {
                regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
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
    result = removeExcess(result.replace(searchString, '***'));
    return result;
});
