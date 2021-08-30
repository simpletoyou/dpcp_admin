/**
 * @desc 组件入口
 *银行汇款单管理
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './address.comp';

let addressVerifyModule = angular.module('addressVerify', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('addressVerify', {
          url: '/certification/address',
          template: '<address-verify></address-verify>'
      })
      .state('addressVerify.addressCurrent', {
          url: '/current',
          template: '<address-current></address-current>'
      })
      .state('addressVerify.addressHistory', {
          url: '/history',
          template: '<address-history></address-history>'
      })
})
.component('addressVerify', Component);

export default addressVerifyModule;