import { detect, filter } from '../../lib/index.js';

// Smoke test 1: Check if sync functions are exported correctly
if (typeof detect !== 'function' || typeof filter !== 'function') {
    console.error('\x1b[31m', 'Smoke Test Failed: Functions not exported correctly.');
    process.exit(1);
}

// Smoke test 2: Basic functionality test
try {
    const testString = 'Fuck you';

    const result1 = await detect(testString);
    if (result1 !== true) {
        throw new Error(`Unexpected output. Output: ${result1}`);
    }

    const result2 = await filter(testString);
    if (result2 !== '*** you') {
        throw new Error(`Unexpected output. Output: ${result2}`);
    }

    console.log('\x1b[32m', 'Smoke Test Passed: Basic functionality works.');
} catch (error) {
    console.error('\x1b[31m', `Smoke Test Failed: ${error.message}`);
    process.exit(1);
}

console.log('\x1b[32m', 'All smoke tests passed.', '\x1b[37m');
process.exit(0);
