import af from './langs/af';
import cz from './langs/cz';
import de from './langs/de';
import en from './langs/en';
import es from './langs/es';
import fi from './langs/fi';
import fr from './langs/fr';
import hi from './langs/hi';
import it from './langs/it';
import nl from './langs/nl';
import pl from './langs/pl';
import ru from './langs/ru';
import sk from './langs/sk';
import th from './langs/th';
import uk from './langs/uk';
const KeywordsSet = Set;
KeywordsSet.prototype.addKeywords = function (...keywords) {
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
export const CustomKeywords = new KeywordsSet();
export const langs = new Map([
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
export const supportedLangs = [...langs.keys()];
/**
 * Removes excess letters followed or preceded by "***" in a string.
 */
export const removeExcess = (str, placeholder = '***') => {
    // Regular expression to match letters before and after "***"
    const regex = /([A-Za-z]+)?\*\*\*([A-Za-z]+)?/g;
    return str.replace(regex, placeholder);
};
