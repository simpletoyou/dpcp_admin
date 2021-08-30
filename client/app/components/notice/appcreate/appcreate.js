/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './appcreate.comp';

let noticeAppcreateModule = angular.module('noticeAppcreate', [
    uiRouter
])
    .component('noticeAppcreate', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeAppcreate', {
            url: '/notice/appcreate',
            template: '<notice-appcreate></notice-appcreate>'
        });
    })

export default noticeAppcreateModule;
