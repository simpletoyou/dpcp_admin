import template from './commonusers.html';
import controller from './commonusers.ctrl';
import './commonusers.less';

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
