import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let rewarDetail = angular.module('rewarDetail', [
        uiRouter
    ])
    .component('rewarDetail', Component)
    .config(($stateProvider) => {
        "ngInject";
        $stateProvider.state('rewarDetail', {
            url: '/coinlocking/rewarDetail',
            template: '<rewar-detail></rewar-detail>'
        });
    });

export default rewarDetail;