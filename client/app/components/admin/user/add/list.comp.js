
// import '../style.less';
import template from './list.html';
import controller from './list.ctrl';
import style from './list.less'

let Component = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
