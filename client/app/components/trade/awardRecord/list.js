import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let awardRecord = angular.module('awardRecord', [
    uiRouter
])
    .component('awardRecord', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('awardRecord', {
            url: '/trade/awardRecord',
            template: '<award-record></award-record>'
        });
    });

export default awardRecord;
