/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './companyadd.comp';

let companyaddModule = angular.module('companyadd', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('companyadd', {
    url: '/users/companyadd',
    template: '<company-add></company-add>'
  });
})
.component('companyAdd', Component);

export default companyaddModule;