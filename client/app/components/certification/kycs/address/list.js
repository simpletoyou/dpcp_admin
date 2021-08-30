/**
 * @desc 组件入口
 * 高级认证
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let kycsAddressModule = angular.module('kycsAddress', [
  uiRouter
])
.config(() => {})

.component('kycsAddress', Component);

export default kycsAddressModule;