/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  rootDir: './',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  testPathIgnorePatterns: ['/node_modules/'],
  detectOpenHandles: true,
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['./setup.ts']
};
