/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:36
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 16:00:08
 */
/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './dpcp-config.comp';

let dpcpConfigModule = angular.module('dpcpConfig', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('dpcpConfig', {
            url: '/dpcp/config',
            template: '<dpcp-config></dpcp-config>'
        });
    })
    .component('dpcpConfig', Component);

export default dpcpConfigModule;