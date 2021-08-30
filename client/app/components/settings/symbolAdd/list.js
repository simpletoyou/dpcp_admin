
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let coinAdd = angular.module('symbolAdd', [
    uiRouter
])
.component('symbolAdd', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('symbolAdd', {
        url: '/setting/symbol-add',
        template: '<symbol-add></symbol-add>'
    });
});


export default coinAdd;
