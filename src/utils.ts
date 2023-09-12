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

export interface KeywordsSet<T> extends Set<T> {
    addKeywords(...keywords: string[] | string[][]): void;
}

export interface KeywordsSetConstructor {
    new <T = any>(values?: readonly T[] | null): KeywordsSet<T>;
    readonly prototype: KeywordsSet<any>;
}

const KeywordsSet: KeywordsSetConstructor = Set as never;

KeywordsSet.prototype.addKeywords = function (...keywords: string[] | string[][]) {
    keywords.forEach((keyword) => {
        if (Array.isArray(keyword)) {
            keyword.forEach((word) => {
                this.add(word);
            });
        } else {
            this.add(keyword);
        }
    });
};
/**
 * Set of custom keywords to use in addition to the default ones
 * @example
 * CustomKeywords.add('foo');
 * CustomKeywords.addKeywords('foo', 'bar');
 * CustomKeywords.delete('foo');
 */
export const CustomKeywords = new KeywordsSet<string>();

export const langs = new Map<string, string[]>([
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
    ['uk', uk]
]);

/**
 * List of supported languages
 * @example ['en', 'fr', ...]
 */
export const supportedLangs: SupportedLang[] = [...langs.keys()] as SupportedLang[];

/**
 * Supported language type
 * @example const english: SupportedLang = 'en'
 * const french: SupportedLang = 'fr'
 */
export type SupportedLang = 'af' | 'cz' | 'de' | 'en' | 'es' | 'fi' | 'fr' | 'hi' | 'it' | 'nl' | 'pl' | 'ru' | 'sk' | 'th' | 'uk';

/**
 * Removes excess letters followed or preceded by "***" in a string.
 */
export const removeExcess = (str: string, placeholder: string = '***'): string => {
    // Regular expression to match letters before and after "***"
    const regex = /([A-Za-z]+)?\*\*\*([A-Za-z]+)?/g;
    return str.replace(regex, placeholder);
};
