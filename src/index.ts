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

const langs = new Map<string, string[]>([
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

/**
 * Supported language type
 */
export type SupportedLang = 'af' | 'cz' | 'de' | 'en' | 'es' | 'fi' | 'fr' | 'hi' | 'it' | 'nl' | 'pl' | 'ru' | 'sk' | 'th' | 'uk';

const removeExcess = (str: string): string => {
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
export const filter = (str: string, select?: SupportedLang | SupportedLang[]) => {

    let result = str;
    let searchString: RegExp;
    const regexArr: string[] = [];

    if (select === undefined) {
        langs.forEach(arr => {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        });
    } else if (typeof select === 'string') {
        const arr = langs.get(select);
        if (arr) {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        } else {
            throw new Error(`Language '${select}' is not supported`);
        }
    } else if (select.length > 0) {
        select.forEach(lang => {
            const arr = langs.get(lang);
            if (arr) {
                regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
            } else {
                throw new Error(`Language '${lang}' is not supported`);
            }
        });
    } else {
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
export const filterAsync = async (str: string, select?: SupportedLang | SupportedLang[]): Promise<string> => {
    let result = str;
    let searchString: RegExp;
    const regexArr: string[] = [];

    if (select === undefined) {
        langs.forEach(arr => {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        });
    } else if (typeof select === 'string') {
        const arr = langs.get(select);
        if (arr) {
            regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
        } else {
            throw new Error(`Language '${select}' is not supported`);
        }
    } else if (select.length > 0) {
        select.forEach(lang => {
            const arr = langs.get(lang);
            if (arr) {
                regexArr.push(arr.map(word => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'));
            } else {
                throw new Error(`Language '${lang}' is not supported`);
            }
        });
    } else {
        throw new Error('No language selected');
    }
    searchString = new RegExp(regexArr.join('|'), 'gi');
    result = removeExcess(result.replace(searchString, '***'));
    return result;
};