const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Test Environment
  testEnvironment: 'jsdom',

  // Setup Files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Module Name Mapping (Path aliases and static assets)
  moduleNameMapping: {
    // Path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/content/(.*)$': '<rootDir>/src/content/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    // Mock static assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },

  // Test Match Patterns
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/**/*.(test|spec).{js,jsx}',
  ],

  // Transform Files
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  // Module File Extensions
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Coverage Configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx}',
    '!src/**/*.stories.{js,jsx}',
    '!src/content/**',
    '!src/app/layout.js',
    '!src/app/globals.css',
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],

  // Test Environment Options
  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  // Ignore Patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/out/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/.vercel/',
  ],



  // Global Variables
  globals: {},

  // Verbose Output
  verbose: true,

  // Clear Mocks
  clearMocks: true,

  // Restore Mocks
  restoreMocks: true,

  // Max Workers
  maxWorkers: '50%',

  // Test Timeout
  testTimeout: 10000,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);