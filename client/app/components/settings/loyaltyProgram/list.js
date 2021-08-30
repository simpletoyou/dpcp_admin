import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let loyaltyProgram = angular.module('loyaltyProgram', [
    uiRouter
])
.component('loyaltyProgram', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('loyaltyProgram', {
        url: '/setting/loyaltyProgram',
        template: '<loyalty_Program></loyalty_Program>'
    });
});


export default loyaltyProgram;
