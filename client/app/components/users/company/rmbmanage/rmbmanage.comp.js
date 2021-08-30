import template from './rmbmanage.html';
import controller from './rmbmanage.ctrl';
import './rmbmanage.less';

let Component = {
  restrict: 'E',
  bindings: {
  	brokerid:'=?brokerid'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;