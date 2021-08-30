
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let coinRulesModule = angular.module('coinRules', [
    uiRouter
])
    .component('coinRules', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('coinRules', {
            url: '/coinrules/:type',
            template: '<coin-rules></coin-rules>'
        });
    });


export default coinRulesModule;
