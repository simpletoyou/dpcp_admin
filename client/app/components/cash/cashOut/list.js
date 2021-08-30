import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let cashListModule = angular.module('cashList', [
    uiRouter
])
    .component('cashList', Component)
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('cashList', {
            url: '/cash/cashout',
            template: '<cash-list></cash-list>'
        });
    });

export default cashListModule;
