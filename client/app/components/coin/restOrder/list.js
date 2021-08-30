import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let gopRestOrderModule = angular.module('restOrder', [
    uiRouter
])
    .component('restOrder', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('restOrder', {
            url: '/coin/restorder/:type',
            template: '<rest-order></rest-order>'
        });
    });

export default gopRestOrderModule;
