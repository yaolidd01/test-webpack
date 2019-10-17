const path = require('path')

const constants = require('./const')

const STATIC_DOMAIN = constants.NODE_ENV === 'prod' ? '' : ''

module.exports = {
    index: path.resolve(__dirname, `../dist/index.html`),
    assetsRoot: path.resolve(__dirname, `../dist/`),
    assetsPublicPath: constants.NODE_ENV === 'dev' ? '/' : `${STATIC_DOMAIN}/`,
    assetsSubDirectory: constants.NODE_ENV === 'dev' ? '' : 'static',
    // 正式环境接入sentry需要sourceMap
    isExtractCss: constants.NODE_ENV === 'prod',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
}
