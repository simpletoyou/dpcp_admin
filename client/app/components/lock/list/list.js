/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let lockListModule = angular.module('lockList', [
    uiRouter
])
    .component('lockList', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('lockList', {
            url: '/lock/list',
            template: '<lock-list></lock-list>'
        });
    });

export default lockListModule;
