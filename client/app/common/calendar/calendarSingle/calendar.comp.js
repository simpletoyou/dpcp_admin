import template from './calendar.html';
import controller from './calendar.ctrl';
import './calendar.less';

let Component = {
    restrict: 'E',
    bindings: {
        gytime: '=?gytime', //组件传给日历的当天时间
        gyformattime: '=?gyformattime', //单个日历时，传回给调用该日历的组件标准时间；
        gymethod: '=?gymethod'
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;