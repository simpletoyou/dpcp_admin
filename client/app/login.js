/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/16
 */

import './lib/main.less';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularCookies from 'angular-cookies';

import './components/toast/toast';

import './common/codeMap';
import includeTop from './common/include/top/index';
import commonFooter from './common/footer/index';

import login from './components/login/login';
import services from './services/index';

angular.module('app', [
    uiRouter,
    angularCookies,
    includeTop.name,
    commonFooter.name,
    login.name,
    services.name
]);
    // .component('app', {
    //     template: `
    //         <div class="app">
    //             <!--<commonheader></commonheader>-->
    //             <!--<bread-nav></bread-nav>-->
    //             <div class='layout-page'>
    //                 111111111
    //                 <div ui-view class='layout-content'></div>
    //             </div>
    //             <!--<commonfooter></commonfooter>-->
    //             <!--<gy-popspecial></gy-popspecial>-->
    //         </div>
    //     `,
    //     restrict: 'E'
    // });

