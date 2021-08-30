import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let innovation = angular.module('innovation', [
        uiRouter
    ])
    .component('innovation', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('innovation', {
            url: '/coin/innovation',
            template: '<innovation></innovation>'
        });
    });

export default innovation;