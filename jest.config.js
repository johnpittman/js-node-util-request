const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
