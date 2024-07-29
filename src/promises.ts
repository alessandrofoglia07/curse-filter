import { langs, removeExcess, SupportedLang, CustomKeywords, FilterOptions, DetectOptions } from './utils.js';

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
export const filter = async (str: string, options?: FilterOptions): Promise<string> => {
    let result = str;
    let searchString: RegExp;
    const regexArr: string[] = [];

    const lang = options?.lang;
    const placeholder = options?.placeholder ?? '***';

    const escapeRegExp = (word: string) => word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

    const processLanguages = async () => {
        // If no language is specified, select all languages
        if (lang === undefined || lang === true) {
            for (const arr of langs.values()) {
                // for each language, add every word, converted to regex, to regex array
                regexArr.push(arr.map(escapeRegExp).join('|'));
                await new Promise((resolve) => setTimeout(resolve, 0)); // Yield control
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
    };

    await processLanguages();

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
};

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
export const detect = async (str: string, options?: DetectOptions): Promise<boolean> => {
    let arr: string[] = [];

    const lang = options?.lang;

    if (lang === undefined || typeof lang === 'boolean') {
        arr = ([] as string[]).concat(...langs.values());
    } else if (typeof lang === 'string') {
        arr = langs.get(lang) || [];
    } else if (lang.length > 0) {
        arr = ([] as string[]).concat(...lang.map((el) => langs.get(el) || []));
    } else {
        throw new Error('No language selected');
    }

    if (CustomKeywords.size > 0) {
        arr = [...arr, ...Array.from(CustomKeywords)];
    }

    const checkWord = async (word: string): Promise<boolean> => {
        return new Promise((resolve) => {
            if (options?.rigidMode) {
                resolve(str.toLowerCase().includes(word.toLowerCase()));
            } else {
                const regex = new RegExp(`\\b${word}\\b`, 'i');
                resolve(regex.test(str));
            }
        });
    };

    const CHUNK_SIZE = options?.processedChunkSize || 100;
    for (let i = 0; i < arr.length; i += CHUNK_SIZE) {
        const chunk = arr.slice(i, i + CHUNK_SIZE);
        const promises = chunk.map(checkWord);
        const results = await Promise.all(promises);
        if (results.includes(true)) return true;
        await new Promise((resolve) => setTimeout(resolve, 0)); // Yield control
    }

    return false;
};
