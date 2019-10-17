const path = require("path");
const config = require("./config");

/**
 * 拼接assetsSubDirectory
 * @param {需要拼接的path} _path
 */
exports.assetsPath = function(_path) {
  return path.posix.join(config.assetsSubDirectory, _path);
};
