import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let teamDetails = angular.module('teamDetails', [
    uiRouter
])
    .component('teamDetails', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('teamDetails', {
            url: '/commonusers/team/performance/teamDetails',
            template: '<team-details></team-details>'
        });
    });

export default teamDetails ;
