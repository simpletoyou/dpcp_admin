/**
 * @desc 组件入口
 * 总余额表——GOP
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let addressHistoryModule = angular.module('addressHistory', [
  uiRouter
])
.config(() => {})

.component('addressHistory', Component);

export default addressHistoryModule;