var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

import globalConfig from './config/global';

const appPath = globalConfig.appPath;

module.exports = {
    entry: {
        'index': ['./client/app/index.js'],
        'login': ['./client/app/login.js']
    },
    module: {
        loaders: [
            // /node_modules(?!\/gy\-ng)/
            {test: /\.js$/i, exclude: [/app\/lib/, /node_modules(?!\/gy\-ng)/], loader: 'ng-annotate!babel'},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.css$/, loader: 'style!css'},
            // IMAGE
            {
                test: /\.(gif|jpe?g|png)$/,
                loader: 'url?limit=10000&name=img/[name].[hash:8].[ext]'
            },
            // FONT
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]"}
        ]
    },
    plugins: [

        // new HtmlWebpackPlugin({
        //     template: path.join(appPath, 'index.html'),
        //     inject: 'body',
        //     hash: false
        // }),
        //
        // new HtmlWebpackPlugin({
        //     template: path.join(appPath, 'login.html'),
        //     inject: 'body',
        //     hash: false
        // })



        // new HtmlWebpackPlugin({
        //     chunks: ['login'],
        //     template: path.join(appPath, 'index.html'),
        //     inject: 'body',
        //     hash: false
        // })

        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     moment: 'moment'
        // })

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function (module, count) {
        //         return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
        //     }
        // })
    ],
    externals: {
        'jquery': 'window.jQuery',
        'moment': 'window.moment'
        // 'angular': 'window.angular'
    }
};
