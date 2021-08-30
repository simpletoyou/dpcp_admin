/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './companylist.comp';
import cookie from '../../../common/cookie'

let companyListModule = angular.module('companylist', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('companylist', {
    url: '/users/companylist',
    template: '<company-list></company-list>'
  });

  // let role = cookie.get('role');
  // if(role === 'ADMIN'){
  //     $stateProvider.state('homePage', {
  //         url: '/',
  //         template: '<company-list></company-list>'
  //     });
  //
  //     $stateProvider.state('indexPage', {
  //         url: '',
  //         template: '<company-list></company-list>'
  //     });
  // }


})
.component('companyList', Component);

export default companyListModule;