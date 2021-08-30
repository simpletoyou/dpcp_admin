
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';
import './list.less'

let symbolConfig = angular.module('symbolConfig', [
    uiRouter
])
.component('symbolConfig', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('symbolConfig', {
        url: '/setting/symbol-config',
        template: '<symbol-config></symbol-config>'
    });
});


export default symbolConfig;
