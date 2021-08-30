/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uitree from 'angular-ui-tree';
import Component from './role-perm.comp';

let rolePermModule = angular.module('rolePerm', [
    uiRouter,uitree
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('rolePerm', {
            url: '/role/perm/',
            template: '<role-perm></role-perm>'
        });
    })
    .component('rolePerm', Component);

export default rolePermModule;