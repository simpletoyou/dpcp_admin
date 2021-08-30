/**
 * @desc 组件入口
 * 实名认证——地址详细信息
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let addressDetailModule = angular.module('addressDetail', [
  uiRouter
])
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('addressDetail', {
        url: '/certification/address/detail',
        template: '<address-detail></address-detail>'
    });
})
.component('addressDetail', Component);

export default addressDetailModule;