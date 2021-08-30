import template from './role-people.html';
import controller from './role-people.ctrl';
import './role-people.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;