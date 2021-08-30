/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/16
 */

import template from './login.html';
import controller from './login.ctrl';
import './login.less';

export default {
    restrict: 'E',
    bindings: {},
    replace: true,
    template,
    controller,
    controllerAs: 'vm'
};