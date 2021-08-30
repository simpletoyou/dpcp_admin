import template from './basicinfo.html';
import controller from './basicinfo.ctrl';
import './basicinfo.less';

let Component = {
    restrict: 'E',
    bindings: {
        uid: '=?uid'
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
