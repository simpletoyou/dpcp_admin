/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import template from './appcreate.html';
import controller from './appcreate.ctrl';
import './appcreate.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
