import template from './popwindow.html';
import controller from './popwindow.ctrl';
import './popwindow.less';

let Component = {
    restrict: 'E',
    bindings: {
        text: '=?text',
        confirm: '=?confirm',
        confirmtext: '=?confirmtext',
        cancel: '=?cancel',
        canceltext: '=?canceltext'
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;