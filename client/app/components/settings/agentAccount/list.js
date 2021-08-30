import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let agentAccount = angular.module('agentAccount', [
        uiRouter
    ])
    .component('agentAccount', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('agentAccount', {
            url: '/setting/agentAccount',
            template: '<agent-account></agent-account>'
        });
    });


export default agentAccount;