/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import template from './add.html';
import controller from './add.ctrl';
import './add.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
