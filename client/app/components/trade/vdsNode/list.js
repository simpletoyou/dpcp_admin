import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeRecordModule = angular.module('vdsnode', [
        uiRouter
    ])
    .component('vdsnode', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('vdsnode', {
            url: '/trade/vdsnode',
            template: '<vdsnode></vdsnode>'
        });
    });

export default tradeRecordModule;