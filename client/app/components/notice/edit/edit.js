/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './add.comp';

let noticeAddModule = angular.module('noticeAdd', [
    uiRouter
])
    .component('noticeAdd', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeAdd', {
            url: '/notice/add',
            template: '<notice-add></notice-add>'
        });
    });

export default noticeAddModule;
