const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack_common');
const entry = commonConfig.entry;
commonConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);
commonConfig.entry = ['webpack-hot-middleware/client', entry]
module.exports = merge(commonConfig, {
    devtool: "inline-source-map",
});