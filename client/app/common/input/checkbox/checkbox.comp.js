import template from './checkbox.html';
import controller from './checkbox.ctrl';
import './checkbox.less';

let Component = {
    restrict: 'E',
    bindings: {
        gyreturn: '=?gyreturn',
        gycheckboxarr: '=?gycheckboxarr'
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;