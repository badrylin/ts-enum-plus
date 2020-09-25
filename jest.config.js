module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverage: true,
  coverageDirectory: "<rootDir>/tests/coverage",
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
};
