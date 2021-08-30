/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './locketlist.comp';

let locketlistModule = angular.module('locketlist', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('locketlist', {
    url: '/commonusers/locketlist',
    template: '<locketlist></locketlist>'
  });
})
.component('locketlist', Component);

export default locketlistModule;