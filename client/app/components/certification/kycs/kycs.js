/**
 * @desc 组件入口
 *银行汇款单管理
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './kycs.comp';

let kycsModule = angular.module('kycs', [
        uiRouter
    ])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider
            .state('kycs', {
                url: '/commonusers/kycs',
                template: '<kycs></kycs>'
            })
            .state('kycs.address', {
                url: '/address',
                template: '<kycs-address></kycs-address>'
            })
            .state('kycs.verify', {
                url: '/verify',
                template: '<kycs-verify></kycs-verify>'
            })
            .state('kycs.history', {
                url: '/history',
                template: '<kycs-history></kycs-history>'
            })
    })
    .component('kycs', Component);

export default kycsModule;