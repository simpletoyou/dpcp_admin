/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let noticeListModule = angular.module('tradeControl', [
    uiRouter
])
    .component('tradeControl', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('tradeControl', {
            url: '/trade/control',
            template: '<trade-control></trade-control>'
        });
    });

export default noticeListModule;
