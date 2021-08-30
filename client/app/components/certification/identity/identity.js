/**
 * @desc 组件入口
 *银行汇款单管理
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './identity.comp';
import cookie from '../../../common/cookie'

let identityVerifyModule = angular.module('identityVerify', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";

        // let role = cookie.get('role');
        // if(role !== 'ADMIN'){
        //     $stateProvider.state('homePage', {
        //         url: '/',
        //         template: '<identity-current></identity-current>'
        //     });
        //
        //     $stateProvider.state('indexPage', {
        //         url: '',
        //         template: '<identity-current></identity-current>'
        //     });
        // }


        $stateProvider
            .state('identityVerify', {
                url: '/certification/identity',
                template: '<identity-verify></identity-verify>'
            })
            .state('identityVerify.identityCurrent', {
                url: '/current',
                template: '<identity-current></identity-current>'
            })
            .state('identityVerify.identityHistory', {
                url: '/history',
                template: '<identity-history></identity-history>'
            })
    })
    .component('identityVerify', Component);

export default identityVerifyModule;