module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/setupTests.js',
  ],
  testMatch: ['**/__tests__/**/*.tsx'],
};
