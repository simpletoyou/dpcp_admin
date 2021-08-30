/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './role-add.comp';

let roleAddModule = angular.module('roleAdd', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('roleAdd', {
            url: '/role/add',
            template: '<role-add></role-add>'
        });
    })
    .component('roleAdd', Component);

export default roleAddModule;