
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';
import './list.less'

let coinConfigConfig = angular.module('coinConfig', [
    uiRouter
])
.component('coinConfig', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('coinConfig', {
        url: '/setting/coin-config',
        template: '<coin-config></coin-config>'
    });
});


export default coinConfigConfig;
