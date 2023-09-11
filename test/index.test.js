import { filter, detect, supportedLangs } from '../lib/index.js';
import { filter as filterAsync, detect as detectAsync } from '../lib/promises.js';
import longText from './longText.js';

describe('supportedLangs', () => {
    expect(supportedLangs).toBeDefined();
});

describe('filter', () => {
    it('should filter in one language', () => {
        const result = filter('Fuck you', ['en']);
        expect(result).toBe('*** you');
    });

    it('should filter in two languages', () => {
        const result = filter('Fuck you, coglione!', ['en', 'it']);
        expect(result).toBe('*** you, ***!');
    });

    it('should filter in every language', () => {
        const result = filter('Fuck you, coglione, bastardo, function, parameters, putain, put');
        expect(result).toBe('*** you, ***, ***, function, parameters, ***, put');
    });
});

describe('filterAsync', () => {
    it('should filter in one language', async () => {
        const promise = filterAsync('Fuck you', ['en']);
        expect(promise).resolves.toBe('*** you');
    });

    it('should filter in two languages', async () => {
        const promise = filterAsync('Fuck you, coglione!', ['en', 'it']);
        expect(promise).resolves.toBe('*** you, ***!');
    });

    it('should filter in every language', async () => {
        const promise = filterAsync('Fuck you, coglione, bastardo, function, parameters, putain, put');
        expect(promise).resolves.toBe('*** you, ***, ***, function, parameters, ***, put');
    });
});

describe('detectAsync', () => {
    it('should detect bad words', () => {
        const result = detectAsync('Fuck you');
        expect(result).resolves.toBe(true);
    });

    it('should detect bad words in multiple languages', () => {
        const result = detectAsync('Fuck you, coglione', ['en', 'it']);
        expect(result).resolves.toBe(true);
    });

    it('should only detect bad words in selected languages', () => {
        const result = detectAsync('Fuck you', 'fr');
        expect(result).resolves.toBe(false);
    });

    it('should return false if no bad words are detected', () => {
        const result = detectAsync('I love you');
        expect(result).resolves.toBe(false);
    });

    it('should work with rigidmode', () => {
        const result = detectAsync('Fuckyou', 'en', { rigidMode: true });
        const result2 = detectAsync('Fuckyou', 'en');
        expect(result).resolves.toBe(true);
        expect(result2).resolves.toBe(false);
    });

    it('should work with really long texts', () => {
        const result = detectAsync(longText, 'it');
        expect(result).resolves.toBe(false);
    });
});

describe('detect', () => {
    it('should detect bad words', () => {
        const result = detect('Fuck you');
        expect(result).toBe(true);
    });

    it('should detect bad words in multiple languages', () => {
        const result = detect('Fuck you, coglione', ['en', 'it']);
        expect(result).toBe(true);
    });

    it('should only detect bad words in selected languages', () => {
        const result = detect('Fuck you', 'fr');
        expect(result).toBe(false);
    });

    it('should return false if no bad words are detected', () => {
        const result = detect('I love you');
        expect(result).toBe(false);
    });

    it('should work with rigidmode', () => {
        const result = detect('Fuckyou', 'en', { rigidMode: true });
        const result2 = detect('Fuckyou', 'en');
        expect(result).toBe(true);
        expect(result2).toBe(false);
    });

    it('should work with really long texts', () => {
        const result = detect(longText, 'it');
        expect(result).toBe(false);
    });
});
