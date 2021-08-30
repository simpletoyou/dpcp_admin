/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/9
 */

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import log4js from 'log4js';
import request from 'superagent';
import sync from 'run-sequence';
import gulpSequence from 'gulp-sequence';
import rename from 'gulp-rename';
import removeFiles from 'gulp-remove-files';
import template from 'gulp-template';
import del from 'del';
import fs from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import uglify from 'gulp-uglify';
import md5 from 'gulp-md5-plus';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpachHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import minimist from 'minimist';
import tplHelper from './gulp/tools/tpl.helper';
import autoresponse from 'autoresponse';

import globalConfig from './gulp/config/global';

import generatorSet from './gulp/tools/generator.set';
import generatorFactory from "./gulp/tools/generator.factory";

import './gulp/tasks/lint';
import './gulp/tasks/component';

global.logger = log4js.getLogger();

const basePath = globalConfig.basePath;
const appPath = globalConfig.appPath;

// helper method for resolving paths
// let resolveToApp = (glob = '') => {
//     return path.join(basePath, glob); // app/{glob}
// };
//
// let resolveToComponents = (glob = '') => {
//     return path.join(basePath, 'components', glob); // app/components/{glob}
// };

// let commonTplPath = path.join(basePath, '../../generator/common');
// let configDirPath = path.join(basePath, '../../generator.conf');

// map of all paths
// let paths = {
//     js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
//     styl: resolveToApp('**/*.styl'), // stylesheets
//     html: [
//         resolveToApp('**/*.html'),
//         path.join(basePath, 'index.html')
//     ],
//     entry: basePath,
//     output: basePath
// };

gulp.task('dep:fonts', (cb) => {
    return gulp.src(path.join(appPath, 'dep/**/*'))
        .pipe(gulp.dest(path.join(globalConfig.destPath, '/dep')));
});

gulp.task('dep:lib', (cb) => {
    return gulp.src(path.join(appPath, 'fonts/**/*'))
        .pipe(gulp.dest(path.join(globalConfig.destPath, '/fonts')));
});

gulp.task('dep', ['dep:lib', 'dep:fonts']);

gulp.task('html', (cb) => {
    return gulp.src(path.join(appPath, '/*.html'))
        .pipe(gulp.dest(globalConfig.destPath));
});

gulp.task('prod:js', (cb) => {
    return gulp.src(path.join(globalConfig.destPath, '/js/*.js'))
        // .pipe(uglify())
        .pipe(md5(6, path.join(globalConfig.destPath, '/*.html')))
        .pipe(gulp.dest(path.join(globalConfig.destPath, '/js')));
});

// use webpack.config.js to build modules
gulp.task('webpack', (cb) => {

    // var options = minimist(
    //     process.argv.slice(2), {
    //         string: ['app'],
    //         default: {
    //             app: path.resolve(__dirname, 'dist')
    //         }
    //     }
    // );
    //
    // console.log('options: ' + options);

    let config = require('./gulp/webpack.' + process.env.NODE_ENV + '.config');
    // console.log(`config is : ` + JSON.stringify(config));

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: colorsSupported,
            chunks: false,
            errorDetails: true
        }));

        cb();
    });
});


gulp.task('server:mock', () => {
    const config = require('./gulp/webpack.server.config.js');
    for (let key in config.entry) {
        config.entry[key].unshift('webpack-hot-middleware/client?reload=true');
    }
    let compiler = webpack(config);
    console.log('compiler',compiler)
    serve({
        port: 8000,
        open: false,
        server: {
            baseDir: appPath
        },
        ui: {
            port: 8001,
            weinre: {
                port: 8002
            }
        },
        middleware: [
            webpackDevMiddleware(compiler, {
                hot: true,
                quiet: true,
                historyApiFallback: true,
                stats: {
                    colors: true
                },
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                },
                publicPath: config.output.publicPath
            }),
            webpachHotMiddleware(compiler),
            getAutoResponse()
        ]
    });

    function getAutoResponse() {
        return autoresponse({
            responseDir: './mock',
            logLevel: 'info',
            post: true,
            get: {
                match: function (reqPathName) { // mock all `/xx/xx` path
                    return !/\.\w+(\?.*)?$/.test(reqPathName);
                }
            }
        });
    }
});

gulp.task('server', () => {
    const config = require('./gulp/webpack.server.config.js');
    for (let key in config.entry) {
        config.entry[key].unshift('webpack-hot-middleware/client?reload=true');
    }
    let compiler = webpack(config);

    serve({
        port: 7000,
        open: false,
        server: {
            baseDir: appPath
        },
        ui: {
            port: 7001,
            weinre: {
                port: 7002
            }
        },
        middleware: [
            webpackDevMiddleware(compiler, {
                hot: true,
                quiet: true,
                historyApiFallback: true,
                stats: {
                    colors: true
                },
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                },
                publicPath: config.output.publicPath
            }),
            webpachHotMiddleware(compiler),
            function (req, res, next) {
                const REG_STATIC = /\w\.(html|js|css|scss|png|gif|jpg|ttf|eot|svg|woff)/gi; //判断是否是资源文件
                // let host = 'http://gdae2.manager.dev.gpdax.com';
                // let host = 'http://manager.nnex.io'
                let host = 'http://manager.nnex.io'
                //http://192.168.0.114:8180
                // let host = 'http://manager.smt-ex.com';
                /*let host = 'http://192.168.0.101:8180';*/

                if (REG_STATIC.test(req.originalUrl)) {
                    global.logger.warn('Static assets: ' + req.originalUrl);
                    next();
                } else {
                    global.logger.warn('remote request begin: ' + host + req.originalUrl);
                    res.setHeader("Content-Type", "application/json; charset=utf-8");
                    var arr = [];
                    req.on("data", function (data) { //接收参数
                        arr.push(data);
                    });
                    req.on("end", function () {
                        let data = Buffer.concat(arr).toString();
                        //判断是否是白名单的url
                        let params = {};

                        // const COOKIE = `name=lipeng; uid=1; role=ADMIN; phone=18600145923;`;    // password: 123456

                        // console.log(COOKIE + req.headers.cookie);

                        try {
                            params = JSON.parse(data);
                        } catch (err) {
                            params = data;
                        }

                        if (req.method.toUpperCase() == 'GET') {
                            if (req.originalUrl.indexOf('exchange_manager/admin/login') >= 0) {
                                global.logger.warn('The login begin ...');
                                request
                                    .get(host + req.originalUrl)
                                    .send(params)
                                    .set('Accept', 'application/json')
                                    .set('accept-language', 'zh-CN')
                                    .set('Cookie', req.headers.cookie || '')
                                    .set('Authorization', req.headers['authorization'] || '')
                                    .end((err, resInner) => {
                                        console.log(JSON.stringify(resInner));
                                        // global.logger.info('The set-cookie is: ' + JSON.stringify(resInner.header['set-cookie']));

                                        res.end(resInner.text);

                                        // 登录失败或者近期内使用同一个session
                                        // if (!resInner.header['set-cookie']) {
                                        //     res.end(resInner.text);
                                        //     // res.end(JSON.stringify(resInner));
                                        // } else {
                                        //     let cookieFromServer = resInner.header['set-cookie'][0];
                                        //
                                        //     let sessionValue = cookieFromServer.split(';')[0].split('=')[1];
                                        //     global.logger.info('Your current session is :' + sessionValue);
                                        //
                                        //     res.setHeader('set-cookie', cookieFromServer);
                                        //     res.end(resInner.text);
                                        // }
                                    });
                            } else {
                                request
                                    .get(host + req.originalUrl) // /gop/xxxx/appsrupoort
                                    .query(params)
                                    .set('Accept', 'application/json')
                                    .set('accept-language', 'zh-CN')
                                    .set('Cookie', req.headers.cookie)
                                    .set('Authorization', req.headers['authorization'] || '')
                                    .pipe(res);
                            }
                        } else {
                            // if (req.originalUrl.indexOf('exchange_manager/common/upload-photo/private') >= 0) {
                            // request
                            //     .post(host + req.originalUrl)
                            //     .send(params)
                            //     .set(req.headers)
                            //     .set('accept-language', 'zh-CN')
                            //     .set('Cookie', req.headers.cookie)
                            //     .set('Authorization', req.headers['authorization'] || '')
                            //     .pipe(res);
                            // }else{
                                request
                                .post(host + req.originalUrl)
                                .send(params)
                                .set('Accept', 'application/json')
                                .set('accept-language', 'zh-CN')
                                .set('Cookie', req.headers.cookie)
                                .set('Authorization', req.headers['authorization'] || '')
                                .pipe(res);
                            // }
                        }
                    })
                }
            }
        ]
    });
});


var sftp = require('gulp-sftp');

// http://manager.dev.gpdax.com/
var options = {
    host: '172.16.33.230',
    port: '9422',
    user: 'root',
    pass: '123456',
    remotePath: '/data/app/static/exchange_manager'
};

gulp.task('scp:dev', ['dev'], function () {
    return gulp.src('./dist/**/*')
        .pipe(sftp(options));
});

gulp.task('scp:qa', ['dev'], function () {
    var options = {
        host: '118.190.102.210', //121.42.41.192
        port: '19422',
        user: 'appuser',
        pass: 'I6(K#ICPi(ra',
        // /data/app/static/exchangeApi
        remotePath: '/data/app/static/exchange_manager'
    };
    return gulp.src('./dist/**/*')
        .pipe(sftp(options));
});


gulp.task('clean', function (cb) {
    return del(globalConfig.destPath, cb);
});

gulp.task('dev', function (cb) {
    process.env.NODE_ENV = 'dev';
    // 使用gulp-sequence，保证任务需要顺序执行时不出问题
    gulpSequence(
        'clean',
        'dep',
        'html',
        'webpack',
        cb
    );
});

gulp.task('prod', function (cb) {
    process.env.NODE_ENV = 'prod';
    // 使用gulp-sequence，保证任务需要顺序执行时不出问题
    gulpSequence(
        'clean',
        'dep',
        'html',
        'webpack',
        'prod:js',
        cb
    );
});