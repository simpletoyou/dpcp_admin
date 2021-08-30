/**
 * @desc 角色人员查看组件入口
 * auther:yxc
 * date:2018年4月13日
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './role-people.comp';

let rolePeopleModule = angular.module('rolePeople', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('rolePeople', {
            url: '/role/people/',
            template: '<role-people></role-people>'
        });
    })
    .component('rolePeople', Component);

export default rolePeopleModule;