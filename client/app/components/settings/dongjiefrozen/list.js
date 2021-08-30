import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let dongjiefrozen = angular.module('dongjiefrozen', [
    uiRouter
])
.component('dongjiefrozen', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('dongjiefrozen', {
        url: '/setting/dongjiefrozen',
        template: '<dongjiefrozen></dongjiefrozen>'
    });
});


export default dongjiefrozen;
