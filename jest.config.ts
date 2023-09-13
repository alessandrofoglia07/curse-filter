import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    extensionsToTreatAsEsm: ['.ts'],
    maxWorkers: 2
};

export default config;
