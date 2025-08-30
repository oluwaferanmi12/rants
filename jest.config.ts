export default {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jestSetup.ts'],
  setupFilesAfterEnv: ['./jestSetupAfterEnv.js'],
  moduleDirectories: ['node_modules', 'src'],
  reporters: ['default', ['jest-junit', {outputDirectory: '.artifacts'}]],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.tsx',
    '\\.(css|less)$': '<rootDir>/src/__mocks__/fileMock.tsx',
  },
  globals: {
    'ts-jest': {
      babelConfig: 'babel.config.js',
      tsconfig: 'tsconfig.spec.json',
    },
  },
};
