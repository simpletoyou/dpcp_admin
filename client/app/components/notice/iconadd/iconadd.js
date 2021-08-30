/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './iconadd.comp';

let noticeIconaddModule = angular.module('noticeIconadd', [
    uiRouter
])
    .component('noticeIconadd', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeIconadd', {
            url: '/notice/iconadd',
            template: '<notice-iconadd></notice-iconadd>'
        });
    })

export default noticeIconaddModule;
