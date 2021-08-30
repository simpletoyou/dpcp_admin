/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './personalinfo.comp';

let personalinfoModule = angular.module('personalinfo', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('personalinfo', {
    url: '/commonusers/personalinfo',
    template: '<personalinfo></personalinfo>'
  });
})
.component('personalinfo', Component);

export default personalinfoModule;