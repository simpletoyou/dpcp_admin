import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';
import ngFileUpload from 'ng-file-upload';

let airDrop = angular.module('airDrop', [
    uiRouter,
    ngFileUpload
])
    .component('airDrop', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('airDrop', {
            url: '/coin/airDrop',
            template: '<air-drop></air-drop>'
        });
    });

export default airDrop;
