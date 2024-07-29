import { detect, filter } from '../../lib/index.js';
import { detect as detectAsync, filter as filterAsync } from '../../lib/promises.js';

// Smoke test 1: Check if sync functions are exported correctly
if (typeof detect !== 'function' || typeof filter !== 'function' || typeof detectAsync !== 'function' || typeof filterAsync !== 'function') {
    console.error('\x1b[31m', 'Smoke Test Failed: Functions not exported correctly.');
    process.exit(1);
}

// Smoke test 2: Basic functionality test
try {
    const testString = 'Fuck you';

    const result1 = detect(testString);
    if (result1 !== true) {
        throw new Error(`Unexpected output. Output: ${result}`);
    }

    const result2 = filter(testString);
    if (result2 !== '*** you') {
        throw new Error(`Unexpected output. Output: ${result2}`);
    }

    const asyncResult1 = await detectAsync(testString);
    if (asyncResult1 !== true) {
        throw new Error(`Unexpected output. Output: ${asyncResult1}`);
    }

    const asyncResult2 = await filterAsync(testString);
    if (asyncResult2 !== '*** you') {
        throw new Error(`Unexpected output. Output: ${asyncResult2}`);
    }

    console.log('\x1b[32m', 'Smoke Test Passed: Basic functionality works.');
} catch (error) {
    console.error('\x1b[31m', `Smoke Test Failed: ${error.message}`);
    process.exit(1);
}

console.log('\x1b[32m', 'All smoke tests passed.', '\x1b[37m');
process.exit(0);
