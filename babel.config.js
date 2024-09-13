module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          components: './src/components',
          lib: './src/lib',
          auth: './src/auth',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
};
