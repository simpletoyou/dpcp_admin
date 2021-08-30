import template from './role-list.html';
import controller from './role-list.ctrl';
import './role-list.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;