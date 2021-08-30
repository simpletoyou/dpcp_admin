
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let setPassword = angular.module('setPassword', [
    uiRouter
])
.component('setPassword', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('setPassword', {
        url: '/account/set-pwd',
        template: '<set-password></set-password>'
    });
});


export default setPassword;
