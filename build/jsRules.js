const { resolve } = require("path");
// const tsImportPluginFactory = require("ts-import-plugin");

// const jsRules = {
//   test: /\.(ts(x?)|js(x?))$/,
//   use: [
//     {
//       loader: "awesome-typescript-loader",
//       options: {
//         transpileOnly: true,
//         useCache: true,
//         cacheDirectory: resolve(__dirname, "../.cache-loader"),
//         useBabel: true,
//         babelOptions: {
//           babelrc: false,
//           plugins: [
//             "transform-object-rest-spread",
//             "transform-decorators-legacy",
//             "transform-class-properties",
//             "syntax-dynamic-import",
//             "react-hot-loader/babel"
//           ]
//         },
//         getCustomTransformers: () => ({
//           before: [
//             tsImportPluginFactory({
//               libraryDirectory: "lib",
//               libraryName: "antd",
//               style: "css"
//             })
//           ]
//         })
//       }
//     }
//   ],
//   exclude: /node_modules/
// };
// module.exports = jsRules;

const { cacheLoader, threadLoader } = require('./loaders')

module.exports = [
  {
    test: /\.(ts(x?)|js(x?))$/,
    // test: /\.(j|t)sx?$/,
    include: [resolve(__dirname, '../src')],
    exclude: /node_modules/,
    use: [
      cacheLoader,
      threadLoader(),
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              // https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json#L32
              { targets: { browsers: ['chrome >= 47'] }, useBuiltIns: 'usage', corejs: 3 }
            ],
            [
              '@babel/preset-typescript',
              {
                allowNamespaces: true
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      }
    ]
  }
]



