/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/16
 */

import './style.less';

import angular from 'angular';
import tpl from './tpl.html';

export default angular.module('includeTop', [])
    .directive('includeTop', function () {
        return {
            restrict: 'E',
            bindings: {},
            replace: true,
            template: tpl,
            controller($scope) {

            },
            controllerAs: 'vm'
        };
    });
