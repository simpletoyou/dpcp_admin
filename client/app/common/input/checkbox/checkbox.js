/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './checkbox.comp';

let Module = angular.module('inputcheckbox', [
    uiRouter
])
//.config(($stateProvider) => {
//	"ngInject";
//	$stateProvider.state('select', {
//		url: '/select',
//		template: '<select></select>'
//	});
//})
    .component('gyCheckbox', Component);

export default Module;