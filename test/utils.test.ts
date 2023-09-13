import { supportedLangs, CustomKeywords } from '../src/index';

describe('supportedLangs', () => {
    it('should be defined', () => {
        expect(supportedLangs).toBeDefined();
    });
});

describe('CustomKeywords', () => {
    it('should be defined', () => {
        expect(CustomKeywords).toBeDefined();
    });

    it('should add words', () => {
        CustomKeywords.add('hey');
        CustomKeywords.addKeywords('hello', 'hi', ['bonjour', 'ciao']);

        expect(CustomKeywords.has('bonjour')).toBe(true);
        expect(CustomKeywords.has('ciao')).toBe(true);
        expect(CustomKeywords.has('hey')).toBe(true);
        expect(CustomKeywords.has('hello')).toBe(true);
        expect(CustomKeywords.has('hi')).toBe(true);
    });

    CustomKeywords.clear();
});
