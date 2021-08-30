/**
 * @desc 组件入口
 * 实名认证——证件详细信息
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let identityDetailModule = angular.module('identityDetail', [
  uiRouter
])
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('identityDetail', {
        url: '/certification/identity/detail',
        template: '<identity-detail></identity-detail>'
    });
})
.component('identityDetail', Component);

export default identityDetailModule;
