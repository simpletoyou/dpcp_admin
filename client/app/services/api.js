
const BROCKER_ID = '10003';     // 默认果仁市场的券商ID是10003

const NO_LOGIN_CODE = '105101';

export default angular
    .module('app.api', [])
    .factory('Api', function ($http, $cookies, $q, $httpParamSerializerJQLike, $rootScope) {
        'ngInject';

        let api = {};

        let basePath = function () {
            return '/exchange_manager';
        };

        function stringifyHeader(param) {
            let results = [];
            if ($.isEmptyObject(param) === true) {
                return '';
            }
            $.map(param, (value, key) => {
                results.push(`${key}=${value}`);
            });
            return results.join(',');
        }

        function getAuthHeader(header) {
            let headers = {
                'Content-Type': "application/json; charset=utf-8",
                'accept-language': 'zh-CN'
            };
            // let account = window.localStorage.getItem('account');
            // let auth;
            // if (account) {
            //     auth = {
            //         'account-no': account
            //     };
            // }

            let token = $cookies.get('LOGIN_TOKEN_ADMIN');

            let auth = {};
            if (token) {
                auth.token = token;
            }

            if (header && $.isEmptyObject(header) === false) {
                auth = $.extend(auth , header);
            }
            if ($.isEmptyObject(auth) === false) {
                headers.authorization = stringifyHeader(auth);
            }
            return headers;
        }

        api.get = function (url, params = {}, header, replace) {
            if(!params.brokerId&&params.brokerId!=='' ){
                params.brokerId = BROCKER_ID;
            }


            let baseUri = basePath();
            if (replace === true) {
                baseUri = '';
            }

            let headers = getAuthHeader(header);

            let deferred = $q.defer();
            window.loading('正在努力加载，请稍候...');
            $http({
                url: baseUri + url,
                method: 'GET',
                params: params,
                headers: headers
            }).then(function (baseResult) {
                window.unloading();
                if (baseResult.status === 200) {
                    if (baseResult.data && baseResult.data.code === NO_LOGIN_CODE) {
                        window.location.href = './login.html';
                        return;
                    }
                    baseResult.data ? deferred.resolve(baseResult.data) : console.log('无data返回数据');
                } else {
                    console.log('请求回馈非200状态');
                }
            }, function (baseResult) {
                window.unloading();
                console.log('请求失败，请重试！！！');
                // let httpError = 'httpError~';
                // console && console.log(httpError);
                // deferred.reject(httpError + ':' + baseResult.status + ',' + baseResult.statusText);
            });
            return deferred.promise;
        };

        api.post = function (url, params = {}, header, replace) {
            if(!params.brokerId&&params.brokerId!=='' ){
                params.brokerId = BROCKER_ID;
            }

            let baseUri = basePath();
            if (replace === true) {
                baseUri = '';
            }

            let headers = getAuthHeader(header);

            let deferred = $q.defer();
            window.loading('正在努力加载，请稍候...');
            $http({
                url: baseUri + url,
                //data: $httpParamSerializerJQLike(params),
                data: JSON.stringify(params || {}),
                method: 'POST',
                headers: headers
            }).then(function (baseResult) { // baseResult  http返回的对象
                window.unloading();
                if (baseResult.status === 200) {
                    if (baseResult.data && baseResult.data.code === NO_LOGIN_CODE) {
                        window.location.href = './login.html';
                        return;
                    }
                    baseResult.data ? deferred.resolve(baseResult.data) : console.log('无data返回数据');
                } else {
                    console.log('请求回馈非200状态');
                }
            }, function (baseResult) {
                window.unloading();
                console.log('请求失败，请重试！！！');
                // alert('请求失败，请重试！！！');
            });

            return deferred.promise;
        };

        api.delete = function (url, params = {}, header, replace) {

            if(!params.brokerId&&params.brokerId!=='' ){
                params.brokerId = BROCKER_ID;
            }


            let baseUri = basePath();
            if (replace === true) {
                baseUri = '';
            }

            let headers = getAuthHeader(header);

            let deferred = $q.defer();
            window.loading('正在努力加载，请稍候...');
            $http({
                url: baseUri + url,
                //data: $httpParamSerializerJQLike(params),
                data: JSON.stringify(params || {}),
                method: 'DELTE',
                headers: headers
            }).then(function (baseResult) { // baseResult  http返回的对象
                window.unloading();
                if (baseResult.status === 200) {
                    if (baseResult.data && baseResult.data.code === NO_LOGIN_CODE) {
                        window.location.href = './login.html';
                        return;
                    }
                    baseResult.data ? deferred.resolve(baseResult.data) : console.log('无data返回数据');
                } else {
                    console.log('请求回馈非200状态');
                }
            }, function (baseResult) {
                console.log('请求失败，请重试！！！');
                // alert('请求失败，请重试！！！');
            });

            return deferred.promise;
        };

        api.getUrl = function (url, params) {
            let returnURL = basePath() + url + '?';
            for (let key of Object.keys(params)) {
                returnURL += key + '=' + params[key] + '&';
            }
            return returnURL + '' + Math.random() + '' + Math.random();
        };

        api.basePath = basePath();


        return api;
    });


