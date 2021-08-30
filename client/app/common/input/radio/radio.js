/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './radio.comp';

let Module = angular.module('inputradio', [
    uiRouter
])
    .component('gyRadio', Component);

export default Module;