import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeGuoJingModule = angular.module('tradeGuoJingAdmin', [
    uiRouter
])
    .component('tradeGuoJingAdmin', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('tradeGuoJingAdmin', {
            url: '/trade/guojingAdmin',
            template: '<trade-guo-jing-admin></trade-guo-jing-admin>'
        });
    });

export default tradeGuoJingModule;
