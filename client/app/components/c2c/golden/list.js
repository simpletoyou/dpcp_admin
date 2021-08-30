
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let c2cModule = angular.module('c2cGolden', [
    uiRouter
])
    .component('c2cGolden', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('c2cGolden', {
            url: '/c2c/golden',
            template: '<c2c-golden></c2c-golden>'
        });
    });


export default c2cModule;
