import { CustomKeywords, detect, filter } from '../src';
import longText from './mocks/longtext';
import longText1 from './mocks/longtext1';

CustomKeywords.add('bonjour');

describe('filter', () => {
    it('should filter in one language', () => {
        const result = filter('Fuck you', { lang: 'en' });
        expect(result).toBe('*** you');
    });

    it('should filter in two languages', () => {
        const result = filter('Fuck you, coglione!', { lang: ['en', 'it'] });
        expect(result).toBe('*** you, ***!');
    });

    it('should filter in every language', () => {
        const result = filter('Fuck you, coglione, bastardo, function, parameters, putain, put');
        expect(result).toBe('*** you, ***, ***, function, parameters, ***, put');
    });

    it('should filter with custom keywords', () => {
        const result = filter('bonjour hey 123', { lang: 'en' });
        expect(result).toBe('*** hey 123');
    });
});

describe('detect', () => {
    it('should detect bad words', () => {
        const result = detect('Fuck you');
        expect(result).toBe(true);
    });

    it('should detect bad words in multiple languages', () => {
        const result = detect('Fuck you, coglione', { lang: ['en', 'it'] });
        expect(result).toBe(true);
    });

    it('should only detect bad words in selected languages', () => {
        const result = detect('Fuck you', { lang: 'fr' });
        expect(result).toBe(false);
    });

    it('should return false if no bad words are detected', () => {
        const result = detect('I love you');
        expect(result).toBe(false);
    });

    it('should work with rigidmode', () => {
        const result = detect('Fuckyou', { lang: 'en', rigidMode: true });
        const result2 = detect('Fuckyou', { lang: 'en' });
        expect(result).toBe(true);
        expect(result2).toBe(false);
    });

    it('should work with really long texts', () => {
        const result = detect(longText);
        const result1 = detect(longText1);
        expect(result).toBe(false);
        expect(result1).toBe(true);
    });

    it('should detect custom keywords', () => {
        const result = detect('bonjour hey 123', { lang: 'en' });
        expect(result).toBe(true);
    });
});
