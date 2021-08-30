import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let reward = angular.module('reward', [
    uiRouter
])
    .component('reward', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('reward', {
            url: '/setting/reward',
            template: '<reward></reward>'
        });
    });

export default reward;
