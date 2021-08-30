import template from './calendarLink.html';
import controller from './calendarLink.ctrl';
import './calendarLink.less';

let Component = {
    restrict: 'E',
    bindings: {
        gyreturnstartdate: '=?gyreturnstartdate',
        gyreturnenddate: '=?gyreturnenddate'
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;
