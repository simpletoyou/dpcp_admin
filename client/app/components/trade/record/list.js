import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeRecordModule = angular.module('tradeRecord', [
    uiRouter
])
    .component('tradeRecord', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('tradeRecord', {
            url: '/trade/record',
            template: '<trade-record></trade-record>'
        });
    });

export default tradeRecordModule;
