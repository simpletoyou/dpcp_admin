/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './role-list.comp';

let roleListModule = angular.module('roleList', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('roleList', {
            url: '/role/list',
            template: '<role-list></role-list>'
        });
    })
    .component('roleList', Component);

export default roleListModule;