
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let calculationConfig = angular.module('calculationConfig', [
    uiRouter
])
.component('calculationConfig', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('calculationConfig', {
        url: '/setting/calculationConfig',
        template: '<calculation-config></calculation-config>'
    });
});


export default calculationConfig;
