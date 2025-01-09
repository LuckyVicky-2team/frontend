// const nextJest = require('next/jest');

// const createJestConfig = nextJest({ dir: './' });

// const customJestConfig = {
//   moduleDirectories: ['node_modules', '<rootDir>/', 'test'],
//   testEnvironment: 'jest-environment-jsdom',
// };

// module.exports = createJestConfig(customJestConfig);

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  // coverageProvider: 'v8',
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/test'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
