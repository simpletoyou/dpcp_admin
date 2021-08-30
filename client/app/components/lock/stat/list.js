/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let lockStatModule = angular.module('lockStat', [
    uiRouter
])
    .component('lockStat', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('lockStat', {
            url: '/lock/stat',
            template: '<lock-stat></lock-stat>'
        });
    });

export default lockStatModule;
