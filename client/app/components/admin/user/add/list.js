
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let adminUserAdd = angular.module('adminUserAdd', [
    uiRouter
])
.component('adminUserAdd', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('adminUserAdd', {
        url: '/admin/add',
        template: '<admin-user-add></admin-user-add>'
    });
});


export default adminUserAdd;
