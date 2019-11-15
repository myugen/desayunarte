const merge = require("deepmerge");
const pkgVersion = require("./package.json").version;

const VERSION = {
  "process.env": {
    VERSION: JSON.stringify(pkgVersion)
  }
};

module.exports = {
  lintOnSave: true,
  chainWebpack: config =>
    config.plugin("define").tap(args => merge(args, [VERSION])),
  publicPath: process.env.NODE_ENV === "production" ? "/desayunarte/" : "/"
};
