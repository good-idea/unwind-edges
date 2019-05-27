module.exports = {
  automock: false,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  setupFiles: ['./setupJest.ts'],
  testMatch: ['**/**/*.test.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    '/__.*__/',
    'jest.config.js',
    './src/types'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
