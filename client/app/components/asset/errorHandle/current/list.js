/**
 * @desc 组件入口
 * 差错处理表——当前
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let errorHandleCurrentModule = angular.module('errorHandleCurrent', [
  uiRouter
]).filter(
    'to_html', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      }
    }]
)
    .config(() => {})
.component('errorHandleCurrent', Component);

export default errorHandleCurrentModule;