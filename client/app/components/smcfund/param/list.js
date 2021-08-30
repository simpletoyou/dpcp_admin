
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let smcFundModule = angular.module('smcFund', [
    uiRouter
])
    .component('smcFund', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('smcFund', {
            url: '/smc/setting',
            template: '<smc-fund></smc-fund>'
        });
    });


export default smcFundModule;
