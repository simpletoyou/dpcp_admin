import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let teamAgent = angular.module('teamAgent', [
    uiRouter
])
    .component('teamAgent', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('teamAgent', {
            url: '/commonusers/team/agent',
            template: '<team-agent></team-agent>'
        });
    });

export default teamAgent;
