/**
 * @desc 组件入口
 * 差错处理表
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './errorHandle.comp';

let errorHandleModule = angular.module('errorHandle', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('errorHandle', {
    url: '/asset/errorHandle',
    template: '<error-handle></error-handle>'
  });
})
.component('errorHandle', Component);

export default errorHandleModule;