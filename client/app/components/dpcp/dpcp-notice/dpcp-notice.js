/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:36
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 17:19:15
 */
/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './dpcp-notice.comp';

let dpcpNoticeModule = angular.module('dpcpNotice', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('dpcpNotice', {
            url: '/dpcp/notice',
            template: '<dpcp-notice></dpcp-notice>'
        });
    })
    .component('dpcpNotice', Component);

export default dpcpNoticeModule;