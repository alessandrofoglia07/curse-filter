import { filter, filterAsync } from '../lib/index.js';

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
