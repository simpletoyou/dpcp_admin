import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let cashInListModule = angular.module('cashInList', [
  uiRouter
])
  .component('cashInList', Component)
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('cashInList', {
      url: '/cash/cashin',
      template: '<cash-in-list></cash-in-list>'
    });
  })


export default cashInListModule;
