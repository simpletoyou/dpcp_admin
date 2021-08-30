import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let c2cAdmin = angular.module('c2cAdmin', [
        uiRouter
    ])
    .component('c2cAdmin', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('c2cAdmin', {
            url: '/setting/c2cAdmin',
            template: '<c2c-admin></c2c-admin>'
        });
    });


export default c2cAdmin;