import template from './radio.html';
import controller from './radio.ctrl';
import './radio.less';

let Component = {
    restrict: 'E',
    bindings: {
        gyreturn: '=?gyreturn',      // 默认值  传回值
        gyradioarr: '=?gyradioarr'	// 单选数据列表
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;