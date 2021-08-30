/**
 * @desc 组件入口
 * 总余额表——人民币
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let addressCurrentModule = angular.module('addressCurrent', [
  uiRouter
])
.config(() => {})

.component('addressCurrent', Component);

export default addressCurrentModule;