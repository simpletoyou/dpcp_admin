/**
 * @desc 组件入口
 * 实名认证——证件审核——历史
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let identityHistoryModule = angular.module('identityHistory', [
  uiRouter
])
// .config(() => {})

.component('identityHistory', Component);

export default identityHistoryModule;