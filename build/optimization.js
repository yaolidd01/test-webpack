const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
const contants = require("./const");

const optimization = {
  runtimeChunk: {
    name: "manifest"
  },
  splitChunks: {
    cacheGroups: {
      "common": {
        test: /[\\/]node_modules[\\/]/,
        name: "common",
        chunks: "all",
        minChunks: 1,
        priority: -20,
        minSize: 0
      },
      'vendor-react': {
        test: /[\\/]node_modules[\\/]react[\\/]/, // 直接使用 test 来做路径匹配
        chunks: "all",
        name: "vendor-react",
        priority: 20,
        enforce: true,
      },
      'mobx': {
        test: /[\\/]node_modules[\\/]mobx[\\/]/, // 直接使用 test 来做路径匹配
        chunks: "all",
        name: "vendor-mobx",
        priority: 18,
        enforce: true,
      },
      'mobx-react-router': {
        test: /[\\/]node_modules[\\/]mobx-react-router[\\/]/, // 直接使用 test 来做路径匹配
        chunks: "all",
        name: "vendor-mobx-react-router",
        priority: 14,
        enforce: true,
      },
      'react-router-dom': {
        test: /[\\/]node_modules[\\/]react-router-dom[\\/]/, // 直接使用 test 来做路径匹配
        chunks: "all",
        name: "vendor-react-router-dom",
        priority: 12,
        enforce: true,
      },
      'mobx-react': {
        test: /[\\/]node_modules[\\/]mobx-react[\\/]/, // 直接使用 test 来做路径匹配
        chunks: "all",
        name: "vendor-mobx-react",
        priority: 11,
        enforce: true,
      },
      'react-dom': {
        test: /[\\/]node_modules[\\/]react-dom[\\/]/, // 直接使用 test 来做路径匹配
        chunks: "all",
        name: "vendor-react-dom",
        priority: 10,
        enforce: true,
      }
    }
  },
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: contants.Bool(contants.NODE_ENV),
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        reduceIdents: false,
        autoprefixer: false
      }
    })
  ]
};

module.exports = contants.NODE_ENV === "prod" ? optimization : {};
