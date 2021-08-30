/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './bankcard.comp';

let bankcardModule = angular.module('bankcard', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('bankcard', {
            url: '/commonusers/personalinfo/bankcard',
            template: '<bankcard></bankcard>'
        });
    })
    .component('bankcard', Component);

export default bankcardModule;