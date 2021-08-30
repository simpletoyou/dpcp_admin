
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let coinAdd = angular.module('coinAdd', [
    uiRouter
])
.component('coinAdd', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('coinAdd', {
        url: '/setting/coin-add',
        template: '<coin-add></coin-add>'
    });
});


export default coinAdd;
