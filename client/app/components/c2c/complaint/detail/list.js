
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let c2cModule = angular.module('c2cComplaintDetail', [
    uiRouter
])
    .component('c2cComplaintDetail', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('c2cComplaintDetail', {
            url: '/c2c/complaint/detail',
            template: '<c2c-complaint-detail></c2c-complaint-detail>'
        });
    });


export default c2cModule;
