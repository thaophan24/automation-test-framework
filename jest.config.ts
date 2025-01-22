import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './src/tests/unit',
    testRegex: '.*\\.spec\\.ts$', // Match files ending with .spec.ts
    moduleFileExtensions: ['ts', 'js', 'json'],
    collectCoverage: true,
    coverageDirectory: '../coverage',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};

export default config;
