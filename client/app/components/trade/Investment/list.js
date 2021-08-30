import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeRecordModule = angular.module('investment', [
        uiRouter
    ])
    .component('investment', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('investment', {
            url: '/trade/investment',
            template: '<investment></investment>'
        });
    });

export default tradeRecordModule;