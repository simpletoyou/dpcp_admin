/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:36
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 17:17:40
 */
/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './dpcp-feedback.comp';

let dpcpFeedbackModule = angular.module('dpcpFeedback', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('dpcpFeedback', {
            url: '/dpcp/feedback',
            template: '<dpcp-feedback></dpcp-feedback>'
        });
    })
    .component('dpcpFeedback', Component);

export default dpcpFeedbackModule;