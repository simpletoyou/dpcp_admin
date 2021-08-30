/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/16
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './login.comp';

export default angular.module('login', [
    uiRouter
])
    .directive('login', function () {
        return Component;
    })
    .config($stateProvider => {
        "ngInject";
        // $stateProvider.state('login', {
        //     url: '/',
        //     template: '<login></login>'
        // });
        $stateProvider.state('login', {
            url: '',
            template: '<login></login>'
        });
    });