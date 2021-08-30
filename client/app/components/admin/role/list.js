
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let adminRole = angular.module('adminRole', [
    uiRouter
])
.component('adminRole', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('adminRole', {
        url: '/admin/role',
        template: '<admin-role></admin-role>'
    });
});


export default adminRole;
