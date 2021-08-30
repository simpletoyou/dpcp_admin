import template from './address.html';
import controller from './address.ctrl';
import './address.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;