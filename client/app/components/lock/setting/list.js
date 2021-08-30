/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let lockSettingModule = angular.module('lockSetting', [
    uiRouter
])
    .component('lockSetting', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('lockSetting', {
            url: '/lock/setting',
            template: '<lock-setting></lock-setting>'
        });
    });

export default lockSettingModule;
