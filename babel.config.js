module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    "react-native-reanimated/plugin",
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "envName": ".env",
    }],
  ],

};
