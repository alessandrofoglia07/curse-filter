import { filter, filterAsync, detect } from '../lib/index.js';
import longText from './longText.js';

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
