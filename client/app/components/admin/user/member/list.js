
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let adminUserMember = angular.module('adminUserMember', [
    uiRouter
])
.component('adminUserMember', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('adminUserMember', {
        url: '/admin/member',
        template: '<admin-user-member></admin-user-member>'
    });
});


export default adminUserMember;
