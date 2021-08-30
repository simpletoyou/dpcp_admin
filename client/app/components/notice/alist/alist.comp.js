/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import template from './alist.html';
import controller from './alist.ctrl';
import './alist.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
