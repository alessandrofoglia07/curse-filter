import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useEsm: true }]
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    maxWorkers: 2
};

export default config;
