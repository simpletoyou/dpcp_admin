import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeRecordModule = angular.module('tradeC2c', [
    uiRouter
])
    .component('tradeC2c', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('tradeC2c', {
            url: '/trade/C2C',
            template: '<trade-c2c></trade-c2c>'
        });
    });

export default tradeRecordModule;
