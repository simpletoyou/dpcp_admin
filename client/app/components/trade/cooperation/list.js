import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeRecordModule = angular.module('cooperation', [
        uiRouter
    ])
    .component('cooperation', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('cooperation', {
            url: '/trade/cooperation',
            template: '<cooperation></cooperation>'
        });
    });

export default tradeRecordModule;