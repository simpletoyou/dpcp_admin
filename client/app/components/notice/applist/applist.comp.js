/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import template from './applist.html';
import controller from './applist.ctrl';
import './applist.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
