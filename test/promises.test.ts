import { CustomKeywords } from '../src';
import { filter, detect } from '../src/promises';
import longText from './mocks/longtext';
import longText1 from './mocks/longtext1';

CustomKeywords.add('bonjour');

describe('filter', () => {
    it('should filter in one language', async () => {
        const promise = filter('Fuck you', 'en');
        expect(promise).resolves.toBe('*** you');
    });

    it('should filter in two languages', async () => {
        const promise = filter('Fuck you, coglione!', ['en', 'it']);
        expect(promise).resolves.toBe('*** you, ***!');
    });

    it('should filter in every language', async () => {
        const promise = filter('Fuck you, coglione, bastardo, function, parameters, putain, put');
        expect(promise).resolves.toBe('*** you, ***, ***, function, parameters, ***, put');
    });

    it('should filter with custom keywords', () => {
        const promise = filter('bonjour hey 123', 'en');
        expect(promise).resolves.toBe('*** hey 123');
    });
});

describe('detect', () => {
    it('should detect bad words', () => {
        const promise = detect('Fuck you');
        expect(promise).resolves.toBe(true);
    });

    it('should detect bad words in multiple languages', () => {
        const promise = detect('Fuck you, coglione', ['en', 'it']);
        expect(promise).resolves.toBe(true);
    });

    it('should only detect bad words in selected languages', () => {
        const promise = detect('Fuck you', 'fr');
        expect(promise).resolves.toBe(false);
    });

    it('should return false if no bad words are detected', () => {
        const promise = detect('I love you');
        expect(promise).resolves.toBe(false);
    });

    it('should work with rigidmode', () => {
        const promise = detect('Fuckyou', 'en', { rigidMode: true });
        const promise1 = detect('Fuckyou', 'en');
        expect(promise).resolves.toBe(true);
        expect(promise1).resolves.toBe(false);
    });

    it('should work with really long texts', () => {
        const promise = detect(longText);
        const promise1 = detect(longText1);
        expect(promise).resolves.toBe(false);
        expect(promise1).resolves.toBe(true);
    });

    it('should detect custom keywords', () => {
        const promise = detect('bonjour hey 123', 'en');
        expect(promise).resolves.toBe(true);
    });
});
