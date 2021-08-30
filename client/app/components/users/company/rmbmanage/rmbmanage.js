/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './rmbmanage.comp';

let rmbManageModule = angular.module('rmbmanage', [uiRouter]).config(() => {
})
    .component('rmbManage', Component);

export default rmbManageModule;