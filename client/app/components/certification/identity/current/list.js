/**
 * @desc 组件入口
 * 实名认证——证件审核——当前
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let identityCurrentModule = angular.module('identityCurrent', [
  uiRouter
])
.config(() => {})

.component('identityCurrent', Component);

export default identityCurrentModule;