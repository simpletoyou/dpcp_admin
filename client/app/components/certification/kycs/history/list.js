/**
 * @desc 组件入口
 * 初级认证
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let kycsHistoryModule = angular.module('kycsHistory', [
    uiRouter
  ])
  .config(() => {})

  .component('kycsHistory', Component);

export default kycsHistoryModule;