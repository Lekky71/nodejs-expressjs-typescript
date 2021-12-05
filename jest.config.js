module.exports = {
  testRegex: 'src/test/.*\\.spec\\.ts',
  testEnvironment: 'node',
  preset: 'ts-jest',
  // TS takes precedence as we want to avoid build artifacts from being required instead of up-to-date .ts file.
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/migrations/**',
    '!src/**/models/**/*',
    '!src/**/interfaces/**/*',
    '!src/**/app.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.d.ts'
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 53,
  //     functions: 67,
  //     lines: 70,
  //     statements: 70,
  //   },
  // },
  setupFilesAfterEnv: ['./jest.setup.js'],
};
