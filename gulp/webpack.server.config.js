var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

import globalConfig from './config/global';
const basePath = globalConfig.basePath;

config.output = {
    filename: './js/[name].js',
    publicPath: '/',
    path: basePath
};

config.devtool = 'sourcemap';

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('server'),
            'DEBUG': true
        }
    })
]);

module.exports = config;
