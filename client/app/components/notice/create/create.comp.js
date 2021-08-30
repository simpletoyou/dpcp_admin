/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import template from './create.html';
import controller from './create.ctrl';
import './create.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
