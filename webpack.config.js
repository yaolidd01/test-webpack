const { resolve } = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const jsRules = require("./build/jsRules");
const styleRules = require("./build/styleRules");
const plugins = require("./build/plugins");
const fileRules = require("./build/fileRules");
const config = require("./build/config");
const { assetsPath } = require("./build/utils");
const constants = require("./build/const");
const optimization = require("./build/optimization");

module.exports = {
  mode: constants.NODE_ENV === "prod" ? "production" : "development",
  entry: {
    main: resolve(__dirname, "src/main.tsx")
  },
  output: {
    path: resolve(__dirname, "dist/"),
    publicPath: config.assetsPublicPath,
    pathinfo: true,
    filename:
      constants.NODE_ENV === "prod"
        ? assetsPath("js/[name].[hash:8].js")
        : "[name].js",
    chunkFilename:
      constants.NODE_ENV === "prod"
        ? assetsPath("js/[name].[id].[chunkhash:8].js")
        : "[name].js"
  },

  devtool: constants.NODE_ENV === 'prod' ? false : 'source-map',

  resolve: {
    modules: [resolve(__dirname, "src"), "node_modules"],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, './tsconfig.webpack.json'),
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      })
    ],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  module: {
    rules: [...jsRules, ...styleRules, ...fileRules]
  },

  plugins,

  optimization,

  watch: constants.NODE_ENV === "prod" ? false : true,
  target: "web",
  stats: {
    errors: true
  },

  devServer: {
    // open: true,
    contentBase: constants.NODE_ENV === "dev" ? "./" : resolve(__dirname, "./dist/"),
    compress: true,
    quiet: true,
    port: 9000,
    hot: true,
    historyApiFallback: {
      index: "/index.html"
    },
  }
};
