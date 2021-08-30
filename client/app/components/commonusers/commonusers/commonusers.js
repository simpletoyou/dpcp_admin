/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './commonusers.comp';

let commonusersModule = angular.module('commonusers', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('commonusers', {
    url: '/commonusers/commonusers',
    template: '<commonusers></commonusers>'
  });
})
.component('commonusers', Component);

export default commonusersModule;