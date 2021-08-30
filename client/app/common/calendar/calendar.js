/**
 * @desc 组件入口
 */
import Component from './calendar.comp';

let Module = angular.module('commoncalendar', [])
    .component('gyCalendar', Component);

export default Module;