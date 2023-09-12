import { filter, detect, supportedLangs, CustomKeywords } from '../lib/index.js';
import { filter as filterAsync, detect as detectAsync } from '../lib/promises.js';
import longText from './longText.js';

describe('supportedLangs', () => {
    expect(supportedLangs).toBeDefined();
});

describe('CustomKeywords', () => {
    expect(CustomKeywords).toBeDefined();
    CustomKeywords.add('hey');
    CustomKeywords.addKeywords('hello', 'hi', ['bonjour', 'ciao']);

    expect(CustomKeywords.has('bonjour')).toBe(true);
    expect(CustomKeywords.has('ciao')).toBe(true);
    expect(CustomKeywords.has('hey')).toBe(true);
    expect(CustomKeywords.has('hello')).toBe(true);
    expect(CustomKeywords.has('hi')).toBe(true);

    CustomKeywords.clear();
});

CustomKeywords.add('bonjour');

describe('filter', () => {
    it('should filter in one language', () => {
        const result = filter('Fuck you', 'en');
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

    it('should filter with custom keywords', () => {
        const result = filter('bonjour hey 123', 'en');
        expect(result).toBe('*** hey 123');
    });
});

describe('filterAsync', () => {
    it('should filter in one language', async () => {
        const promise = filterAsync('Fuck you', 'en');
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

    it('should filter with custom keywords', () => {
        const promise = filterAsync('bonjour hey 123', 'en');
        expect(promise).resolves.toBe('*** hey 123');
    });
});

describe('detectAsync', () => {
    it('should detect bad words', () => {
        const promise = detectAsync('Fuck you');
        expect(promise).resolves.toBe(true);
    });

    it('should detect bad words in multiple languages', () => {
        const promise = detectAsync('Fuck you, coglione', ['en', 'it']);
        expect(promise).resolves.toBe(true);
    });

    it('should only detect bad words in selected languages', () => {
        const promise = detectAsync('Fuck you', 'fr');
        expect(promise).resolves.toBe(false);
    });

    it('should return false if no bad words are detected', () => {
        const promise = detectAsync('I love you');
        expect(promise).resolves.toBe(false);
    });

    it('should work with rigidmode', () => {
        const promise = detectAsync('Fuckyou', 'en', { rigidMode: true });
        const promise1 = detectAsync('Fuckyou', 'en');
        expect(promise).resolves.toBe(true);
        expect(promise1).resolves.toBe(false);
    });

    it('should work with really long texts', () => {
        const promise = detectAsync(longText, 'it');
        expect(promise).resolves.toBe(false);
    });

    it('should detect custom keywords', () => {
        const promise = detectAsync('bonjour hey 123', 'en');
        expect(promise).resolves.toBe(true);
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

    it('should detect custom keywords', () => {
        const result = detect('bonjour hey 123', 'en');
        expect(result).toBe(true);
    });
});
