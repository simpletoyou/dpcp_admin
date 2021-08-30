/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './companyuser.comp';

let companyUserModule = angular.module('companyuser', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('companyuser', {
            url: '/users/company',
            template: '<company-user></company-user>'
        });
    })
    .component('companyUser', Component);

export default companyUserModule;