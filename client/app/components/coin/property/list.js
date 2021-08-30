import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let property = angular.module('property', [
        uiRouter
    ])
    .component('property', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('property', {
            url: '/coin/property',
            template: '<property></property>'
        });
    });

export default property;
