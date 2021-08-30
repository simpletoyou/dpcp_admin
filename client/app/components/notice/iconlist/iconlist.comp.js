/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import template from './iconlist.html';
import controller from './iconlist.ctrl';
import './iconlist.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
