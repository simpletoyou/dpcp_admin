import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let gopTradeModule = angular.module('coinTrade', [
    uiRouter
])
    .component('coinTrade', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('gopTrade', {
            url: '/cointrade',
            template: '<coin-trade></coin-trade>'
        });
    });

export default gopTradeModule;
