import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeRecordModule = angular.module('distribution', [
        uiRouter
    ])
    .component('distribution', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('distribution', {
            url: '/trade/distribution',
            template: '<distribution></distribution>'
        });
    });

export default tradeRecordModule;