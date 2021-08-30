/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import template from './list.html';
import controller from './list.ctrl';
import './list.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
