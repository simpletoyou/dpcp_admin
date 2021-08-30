import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let gopReviewModule = angular.module('coinOut', [
    uiRouter
])
    .component('coinOut', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('coinout', {
            url: '/coinout/:type',
            template: '<coin-out></coin-out>'
        });
    });

export default gopReviewModule;
