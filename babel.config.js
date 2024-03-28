module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './assets',
          '@screens': './src/screens',
          '@components': './src/components',
        },
      },
    ],
  ],
};
