import { DetectOptions, supportedLangs, loadLang } from './utils.js';

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
    let words: string[] = [];

    const lang = options?.lang;
    const customKeywords = options?.customKeywords;

    const langsToLoad = lang === undefined ? supportedLangs : typeof lang === 'string' ? [lang] : lang;

    for (const l of langsToLoad) {
        const arr = await loadLang(l);
        words.push.apply(words, arr);
    }

    if (customKeywords && customKeywords.size > 0) {
        words = [...words, ...Array.from(customKeywords)];
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
    for (let i = 0; i < words.length; i += CHUNK_SIZE) {
        const chunk = words.slice(i, i + CHUNK_SIZE);
        const promises = chunk.map(checkWord);
        const results = await Promise.all(promises);
        if (results.includes(true)) return true;
        await new Promise((resolve) => setTimeout(resolve, 0)); // Yield control
    }

    return false;
};
