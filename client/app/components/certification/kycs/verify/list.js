/**
 * @desc 组件入口
 * 初级认证
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let kycsVerifyModule = angular.module('kycsVerify', [
  uiRouter
])
.config(() => {})

.component('kycsVerify', Component);

export default kycsVerifyModule;