/**
 * @desc 组件入口
 */
import Component from './calendar.comp';
import template from './calendar.formly.html';

let Module = angular.module('commoncalendarsingle', [])
    .component('gyCalendarsingle', Component);

export default Module;