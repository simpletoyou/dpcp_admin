var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');
var distPath = path.resolve(__dirname, '../dist');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


config.output = {
    filename: './js/[name].js',
    publicPath: '',
    path: distPath
};

config.plugins = config.plugins.concat([

    // new webpack.optimize.UglifyJsPlugin({
    //     mangle: {
    //         except: ['$super', '$', 'exports', 'require', 'angular']
    //     }
    // }),

    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('prod'),
            'DEBUG': false
        }
    })


]);


module.exports = config;
