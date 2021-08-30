/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './add.comp';

let orderAddModule = angular.module('orderAdd', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('orderAdd', {
    url: '/order/add',
    template: '<order-add></order-add>'
  });
})
.component('orderAdd', Component);

export default orderAddModule;