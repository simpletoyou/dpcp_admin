/**
 * @desc 组件入口
 *银行汇款单管理
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './batch.comp';

let batchModule = angular.module('batch', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('batch', {
    url: '/asset/batch',
    template: '<batch></batch>'
  });
})
.component('batch', Component);

export default batchModule;