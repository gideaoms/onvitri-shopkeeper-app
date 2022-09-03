module.exports = function Babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
      [
        'inline-dotenv',
        {
          path: '.env',
        },
      ],
      // Reanimated plugin has to be listed last.
      'react-native-reanimated/plugin',
    ],
  };
};
