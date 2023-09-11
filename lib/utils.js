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