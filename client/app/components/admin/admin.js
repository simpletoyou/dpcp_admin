/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Component from './admin.comp';

export default angular.module('admin', [
    uiRouter
])
    .component('admin', Component)
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('admin', {
            url: '/admin',
            template: '<admin></admin>'
        });
    });
