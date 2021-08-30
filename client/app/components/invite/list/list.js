/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let inviteListModule = angular.module('inviteList', [
    uiRouter
])
    .component('inviteList', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('inviteList', {
            url: '/invite/list',
            template: '<invite-list></invite-list>'
        });
    });

export default inviteListModule;
