const { assetsPath } = require("./utils");
const { resolve } = require("path");
const { threadLoader, cacheLoader } = require('./loaders')
const constants = require("./const");

const fileRules = [
  {
    test: /\.(jpeg|png|jpg|gif|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          name: constants.NODE_ENV === 'dev' ?
            assetsPath("[name].[ext]") :
            assetsPath("[name].[hash:7].[ext]")
        }
      }
    ]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: "url-loader",
    query: {
      limit: 10000,
      name: constants.NODE_ENV === 'dev' ?
        assetsPath("[name].[ext]") :
        assetsPath("[name].[hash:7].[ext]"),
    }
  },
  {
    test: /\.svg$/,
    loader: [cacheLoader, threadLoader(), '@svgr/webpack'],
    include: [resolve(__dirname, "src")]
  }
];

module.exports = fileRules;
