
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let googleAuth = angular.module('googleAuth', [
    uiRouter
])
.component('googleAuth', Component)
.config(($stateProvider) => {
    "ngInject";
    $stateProvider.state('googleAuth', {
        url: '/account/google',
        template: '<google-auth></google-auth>'
    });
});


export default googleAuth;
