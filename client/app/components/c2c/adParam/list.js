
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let c2cModule = angular.module('c2cAdParam', [
    uiRouter
])
    .component('c2cAdParam', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('c2cAdParam', {
            url: '/c2c/adparam',
            template: '<c2c-ad-param></c2c-ad-param>'
        });
    });


export default c2cModule;
