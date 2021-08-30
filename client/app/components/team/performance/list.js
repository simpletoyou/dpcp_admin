import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let teamPerformance = angular.module('teamPerformance', [
    uiRouter
])
    .component('teamPerformance', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('teamPerformance', {
            url: '/commonusers/team/performance',
            template: '<team-performance></team-performance>'
        });
    });

export default teamPerformance;
