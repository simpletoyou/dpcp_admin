import template from './bankcard.html';
import controller from './bankcard.ctrl';
import './bankcard.less';

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
