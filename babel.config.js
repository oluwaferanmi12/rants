module.exports = {
  presets: [
    ['@babel/preset-env', {loose: true}],
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['.'],
        alias: {
          '@root': './',
          '@components': './src/components',
          '@library': './src/libs',
          '@config': './src/config',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@data': './src/data',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
