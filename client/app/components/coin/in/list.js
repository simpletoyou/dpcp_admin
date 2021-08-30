import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let gopInListModule = angular.module('coinInList', [
    uiRouter
])
    .component('coinInList', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('gopInList', {
            url: '/coinin/:type',
            template: '<coin-in-list></coin-in-list>'
        });
    });

export default gopInListModule;
