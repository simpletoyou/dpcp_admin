/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './alist.comp';

let noticeAlistModule = angular.module('noticeAlist', [
    uiRouter
])
    .component('noticeAlist', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeAlist', {
            url: '/notice/alist',
            template: '<notice-alist></notice-alist>'
        });
    });

export default noticeAlistModule;
