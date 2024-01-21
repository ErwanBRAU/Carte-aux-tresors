const config = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testRegex: './src/__test__/.*\\.(test|spec)?\\.js$',
  collectCoverageFrom: ['src/*/*.js']
};

module.exports = config;
