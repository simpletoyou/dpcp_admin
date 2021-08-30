/**
 * @desc 组件入口
 * 差错处理表——当前
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let errorHandleHistoryModule = angular.module('errorHandleHistory', [
  uiRouter
])
.config(() => {})
.component('errorHandleHistory', Component);

export default errorHandleHistoryModule;