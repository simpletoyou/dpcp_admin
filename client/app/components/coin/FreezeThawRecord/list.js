import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let freezeThawRecord = angular.module('freezeThawRecord', [
        uiRouter
    ])
    .component('freezeThawRecord', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('freezeThawRecord', {
            url: '/coin/freezeThawRecord',
            template: '<freeze-thaw-record></freeze-thaw-record>'
        });
    });

export default freezeThawRecord;