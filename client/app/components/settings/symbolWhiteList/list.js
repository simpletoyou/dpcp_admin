
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let symbolWhiteList = angular.module('symbolWhiteList', [
    uiRouter
])
.component('symbolWhiteList', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('symbolWhiteList', {
        url: '/setting/symbol-white-list',
        template: '<symbol-white-list></symbol-white-list>'
    });
});


export default symbolWhiteList;
