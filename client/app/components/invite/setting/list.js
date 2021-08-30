/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let inviteSettingModule = angular.module('inviteSetting', [
    uiRouter
])
    .component('inviteSetting', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('inviteSetting', {
            url: '/invite/setting',
            template: '<invite-setting></invite-setting>'
        });
    });

export default inviteSettingModule;
