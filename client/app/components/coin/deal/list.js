import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let gopDealListModule = angular.module('dealList', [
	uiRouter
])
	.component('dealList', Component)
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('dealList', {
			url: '/coin/deal/:type',
			template: '<deal-list></deal-list>'
		});
	});

export default gopDealListModule;
