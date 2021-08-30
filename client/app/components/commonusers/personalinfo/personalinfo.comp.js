import template from './personalinfo.html';
import controller from './personalinfo.ctrl';
import './personalinfo.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
