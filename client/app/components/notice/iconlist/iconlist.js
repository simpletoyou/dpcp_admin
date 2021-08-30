/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './iconlist.comp';

let noticeIconlistModule = angular.module('noticeIconlist', [
    uiRouter
])
    .component('noticeIconlist', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeIconlist', {
            url: '/notice/iconlist',
            template: '<notice-iconlist></notice-iconlist>'
        });
    });

export default noticeIconlistModule;
