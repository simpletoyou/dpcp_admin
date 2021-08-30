import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let c2cAgent = angular.module('c2cAgent', [
        uiRouter
    ])
    .component('c2cAgent', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('c2cAgent', {
            url: '/commonusers/c2cAgent',
            template: '<c2c-agent></c2c-agent>'
        });
    });

export default c2cAgent;