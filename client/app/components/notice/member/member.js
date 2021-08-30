/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './member.comp';

let noticeMemberModule = angular.module('noticemember', [
    uiRouter
])
    .component('noticeMember', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('noticeMember', {
            url: '/notice/member',
            template: '<notice-member></notice-member>'
        });
    });

export default noticeMemberModule;
