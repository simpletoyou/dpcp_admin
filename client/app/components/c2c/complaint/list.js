
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let c2cModule = angular.module('c2cComplaint', [
    uiRouter
])
    .component('c2cComplaint', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('c2cComplaint', {
            url: '/c2c/complaint',
            template: '<c2c-complaint></c2c-complaint>'
        });
    });


export default c2cModule;
