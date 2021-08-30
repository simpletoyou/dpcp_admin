/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './loginwindow.comp';

let Module = angular.module('', [])
    .component('gyLoginwindow', Component);

export default Module;