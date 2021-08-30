import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let tradeRecordModule = angular.module('vdsfee', [
        uiRouter
    ])
    .component('vdsfee', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('vdsfee', {
            url: '/trade/vdsfee',
            template: '<vdsfee></vdsfee>'
        });
    });

export default tradeRecordModule;