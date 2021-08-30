/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './calendarLink.comp';

let Module = angular.module('../common/calendarcalendarLink', [
    uiRouter
])
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('calendarLink', {
            url: '/calendarLink',
            template: '<calendarLink></calendarLink>'
        });
    })
    .component('gyCalendarlink', Component);

export default Module;