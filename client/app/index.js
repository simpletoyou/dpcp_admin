import './lib/main.less';

import 'jquery';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';					//引入 公用组件集 入口 header footer input
import Components from './components/components';		//引入 组件集 入口     app.order
// import AppComponent from './app.component';				//引入app组件化的相关配置
import uibs from 'angular-ui-bootstrap';
import ngMessages from 'angular-messages';
import ngFileUpload from 'ng-file-upload';
import ngSanitize from 'angular-sanitize';
import angularCookies from 'angular-cookies';
import formly from "angular-formly";
import formlyBootstrap from "angular-formly-templates-bootstrap";

import './components/toast/toast';
import filters from './common/filter';

// import 'bootstrap';
// import 'angular-bootstrap-datetimepicker';
// import 'angular-bootstrap-datetimepicker/src/css/datetimepicker.css';
// import 'angular-bootstrap-datetimepicker/src/js/datetimepicker.templates';
// import './lib/bootstrap-theme.css';
// import './lib/select.css';
// import './lib/font-awesome/css/font-awesome.css';
// import './lib/angular-busy.css';

angular.module('app', [
    ngMessages,
    // 'ui.bootstrap.datetimepicker',
    ngFileUpload,
    uiRouter,
    Common.name,
    uibs,
    angularCookies,
    ngSanitize,
    formly,
    formlyBootstrap,
    Components.name, // app.order  ng模块的名字
    filters.name
])
    .constant('$menuConstant', {
        DEBUG: process.env.DEBUG
    })
    .component('app', {
        template: `
            <div class="app">
                <commonheader></commonheader>
                <bread-nav></bread-nav>
                <div class='layout-page fn-clearfix'>
                    <gp-tree class='layout-tree'></gp-tree>
                    <div ui-view class='layout-content'></div>
                </div>
                <commonfooter></commonfooter>
                <gy-popspecial></gy-popspecial>
            </div>
        `,
        restrict: 'E'
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

            function valToString(val) {
                return val != null ? val.toString().replace(/\//g, "%2F") : val;
            }

            function valFromString(val) {
                return val != null ? val.toString().replace(/%2F/g, "/") : val;
            }

            $urlMatcherFactoryProvider.type('nonURIEncoded', {
                encode: valToString,
                decode: valFromString,
                is: function () {
                    return true;
                }
            });

            // $locationProvider.html5Mode(true);

            // function valToString(val) { return val != null ? val.toString() : val; }
            // function valFromString(val) { return val != null ? val.toString() : val; }
            // function regexpMatches(val) { /*jshint validthis:true */ return this.pattern.test(val); }
            // $urlMatcherFactoryProvider.type("MyType", {
            //     encode: valToString,
            //     decode: valFromString,
            //     is: regexpMatches,
            //     pattern: /[a-zA-Z0-9/\%]/
            // });
            //
            $urlRouterProvider.otherwise('/account/google');
        }
    ]).run(['$rootScope', '$location', function($rootScope, $location) {

        // 权限控制
        let urlArr = window.$role.filter(item => {
            return item.level === 1
        }).map(item =>{
            return '/' + item.menuModule
        })

        urlArr.push("/dpcp/config","/dpcp/files")

        console.log('urlArr',urlArr)

        $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState, fromParams) {
            let hashPath = $location.$$path
            // console.log(hashPath, toState)
            let isInUrlArr = urlArr.some(url => {
                if (url.indexOf(':') > -1) {
                    return hashPath.indexOf(url.split(':')[0]) === 0
                } else {
                    return url === hashPath || (url + '/') === hashPath
                }
            })

            console.log('hashPath',hashPath)
            console.log('isInUrlArr',isInUrlArr)
            if(hashPath.indexOf('/notice') > -1){

            // }else if(hashPath.indexOf('/setting/reward') > -1){

            // }else if(hashPath.indexOf('/setting/calculationConfig') > -1){

            }else if(hashPath.indexOf('/trade/guojing') > -1){
                
            }else if(hashPath.indexOf('/trade/guojingAdmin') > -1){
                
            }else if(hashPath.indexOf('/trade/C2C') > -1){

            }else{
                if (!isInUrlArr) {
                    window.toast('账户无权限。')
                    event.preventDefault()
                }
            }
            
        })

        // 权限控制end
    }]);
