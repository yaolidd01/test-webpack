const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const constants = require("./const");
const { resolve } = require("path");

const theme = {
  "primary-color": "#1DA57A"
};

const lessLoader = {
  loader: "less-loader",
  options: {
    javascriptEnabled: true,
    //修改主题变量
    modifyVars: theme
  }
};

const cacheLoader = {
  loader: "cache-loader",
  options: {
    // provide a cache directory where cache items should be stored
    cacheDirectory: resolve(__dirname, "../.cache-loader")
  }
};

const cssLoader = modules => ({
  loader: 'css-loader',
  options: {
    modules: modules
      ? {
        mode: 'local',
        localIdentName: '[local]--[hash:base64:8]'
      }
      : false
  }
})


const styleRules = [
  {
    test: /\.css$/,
    include: [resolve(__dirname, '../node_modules')],
    use: [
      constants.NODE_ENV === "prod" ? MiniCssExtractPlugin.loader : 'style-loader',
      cacheLoader,
      cssLoader(false),
      'postcss-loader'
    ]
  },

  {
    test: /\.less$/,
    use: [
      constants.NODE_ENV === "prod"
        ? MiniCssExtractPlugin.loader
        : "style-loader",
      cacheLoader,
      cssLoader(true),
      "postcss-loader",
      lessLoader
    ]
  }
];


module.exports = styleRules;
