import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let gopReviewModule = angular.module('coinCheck', [
    uiRouter
])
    .component('coinCheck', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('coincheck', {
            url: '/coincheck/:type',
            template: '<coin-check></coin-check>'
        });
    });

export default gopReviewModule;
