import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let gopDepositModule = angular.module('coinDeposit', [
    uiRouter
])
    .component('coinDeposit', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('gopDeposit', {
            url: '/coindeposit',
            template: '<coin-deposit></coin-deposit>'
        });
    });

export default gopDepositModule;
