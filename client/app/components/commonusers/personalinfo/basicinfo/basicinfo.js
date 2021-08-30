/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './basicinfo.comp';

let basicinfoModule = angular.module('basicinfo', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('basicinfo', {
    url: '/commonusers/personalinfo/basicinfo',
    template: '<basic-info></basic-info>'
  });
})
.component('basicinfo', Component);

export default basicinfoModule;