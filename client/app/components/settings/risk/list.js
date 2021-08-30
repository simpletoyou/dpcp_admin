
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';
import style from './list.less'

let cashInListModule = angular.module('settingRisk', [
    uiRouter
])
    .component('settingRisk', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('settingRisk', {
            url: '/setting/risk',
            template: '<setting-risk></setting-risk>'
        });
    });


export default cashInListModule;
