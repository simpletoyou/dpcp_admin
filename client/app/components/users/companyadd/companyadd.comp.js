import template from './companyadd.html';
import controller from './companyadd.ctrl';
import './companyadd.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;