/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './create.comp';

let noticeCreateModule = angular.module('noticeCreate', [
    uiRouter
])
    .component('noticeCreate', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeCreate', {
            url: '/notice/create',
            template: '<notice-create></notice-create>'
        });
    })

export default noticeCreateModule;
