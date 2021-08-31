/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:36
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 16:56:40
 */
/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './dpcp-files.comp';

let dpcpFilesModule = angular.module('dpcpFiles', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('dpcpFiles', {
            url: '/dpcp/files',
            template: '<dpcp-files></dpcp-files>'
        });
    })
    .component('dpcpFiles', Component);

export default dpcpFilesModule;