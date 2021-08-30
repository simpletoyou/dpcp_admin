/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './applist.comp';

let noticeApplistModule = angular.module('noticeApplist', [
    uiRouter
])
    .component('noticeApplist', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeApplist', {
            url: '/notice/applist',
            template: '<notice-applist></notice-applist>'
        });
    });

export default noticeApplistModule;
