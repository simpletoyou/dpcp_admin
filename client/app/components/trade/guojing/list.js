import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeGuoJingModule = angular.module('tradeGuoJing', [
    uiRouter
])
    .component('tradeGuoJing', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('tradeGuoJing', {
            url: '/trade/guojing',
            template: '<trade-guo-jing></trade-guo-jing>'
        });
    });

export default tradeGuoJingModule;
