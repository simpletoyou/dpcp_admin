
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let adminUser = angular.module('adminUser', [
    uiRouter
])
.component('adminUser', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('adminUser', {
        url: '/admin/user',
        template: '<admin-user></admin-user>'
    });
});


export default adminUser;
