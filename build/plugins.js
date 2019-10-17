const webpack = require("webpack");
const { resolve } = require("path");
const config = require("./config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TSLintPlugin = require('tslint-webpack-plugin');

// case-sensitive-paths-webpack-plugin 防止不同系统导致的 大小写不同导致导入的路径不同出现错误
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
// workbox-webpack-plugin Web 站点轻松做到离线可访问
// const WorkboxPlugin = require('workbox-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
// typed-css-modules-webpack-plugin 解决 css 在 typescript 中找不到模块的问题 并自动生成 .d.ts;
// const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin')
const { compilerHooks } = require('./custom-plugins')
const constants = require("./const");
const { assetsPath } = require("./utils");
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard();


const basePlugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(constants.NODE_ENV === 'prod' ? 'production' : 'development'),
	}),
	new webpack.WatchIgnorePlugin([/less\.d\.ts$/]),
	new CleanWebpackPlugin([resolve(__dirname, "../dist/")], {
		root: resolve(__dirname, "./../"),
		verbose: true,
		dry: false
	}),
	new MomentLocalesPlugin({
		localesToKeep: ['es-us', 'zh-cn']
	}),
	// 这个插件 对 less 的支持不够友好
	// new TypedCssModulesPlugin({
	// 	globPattern: 'src/!(base)/**/*.less',
	// 	postCssPlugins: [lessLoader],
	// }),
];

const devPlugins = [
	new HtmlWebpackPlugin({
		template: resolve(__dirname, "../index.html"),
		inject: true
	}),
	new CaseSensitivePathsPlugin(),
	new TSLintPlugin({
		files: ['./src/**/\w*.ts(x?)', './src/typings/*.ts'],
	}),
	...compilerHooks,
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(), // 执行热替换时打印模块名字
	new DashboardPlugin(dashboard.setData),
];

const prodPlugins = [
	new ProgressBarPlugin(),
	new HtmlWebpackPlugin({
		filename: resolve(__dirname, "../dist/index.html"),
		template: resolve(__dirname, "../index.html"),
		title: "test",
		// favicon: './favicon.ico',
		inject: true,
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			// more options:
			// https://github.com/kangax/html-minifier#options-quick-reference
		},
		chunksSortMode: "dependency"
	}),
	// 提取 css 到文件的插件
	new MiniCssExtractPlugin({
		// Options similar to the same options in webpackOptions.output
		// both options are optional
		filename: assetsPath("css/[name].[hash].css"),
		chunkFilename: assetsPath("css/[name].[id].[hash].css")
	}),
	// 离线应用
	// new WorkboxPlugin.GenerateSW({
	// 	cacheId: 'ts-react-webpack',
	// 	clientsClaim: true,
	// 	skipWaiting: true,
	// 	offlineGoogleAnalytics: false,
	// 	// do not use google cdn
	// 	importWorkboxFrom: 'local',
	// 	// precache ignore
	// 	exclude: [/index\.html$/, /\.map$/],
	// 	// dynamic update
	// 	runtimeCaching: [
	// 		{
	// 			// match html
	// 			urlPattern: config.pagePattern,
	// 			handler: 'NetworkFirst'
	// 		},
	// 		{
	// 			// match static resource
	// 			urlPattern: config.assetsPattern,
	// 			handler: 'StaleWhileRevalidate'
	// 		}
	// 	]
	// })

];

//  用来分析打包模块的大小和体积
if (config.bundleAnalyzerReport) {
	const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
	prodPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = basePlugins.concat(
	constants.NODE_ENV === "prod" ? prodPlugins : devPlugins
);
