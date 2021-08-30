/**
 * @desc 组件入口
 *银行汇款单管理
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './allBalance.comp';

let allBalanceModule = angular.module('allBalance', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('allBalance', {
    url: '/asset/allBalance',
    template: '<all-balance></all-balance>'
  });
})
.component('allBalance', Component);

export default allBalanceModule;