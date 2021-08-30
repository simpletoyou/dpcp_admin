
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let loginInfoList = angular.module('loginInfoList', [
    uiRouter
])
.component('loginInfoList', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('loginInfoList', {
        url: '/account/login-info',
        template: '<login-info-list></login-info-list>'
    });
});


export default loginInfoList;
