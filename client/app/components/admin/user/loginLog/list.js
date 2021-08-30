
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let adminUserLoginLog = angular.module('adminUserLoginLog', [
    uiRouter
])
.component('adminUserLoginLog', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('adminUserLoginLog', {
        url: '/admin/user/login-log',
        template: '<admin-user-login-log></admin-user-login-log>'
    });
});


export default adminUserLoginLog;
