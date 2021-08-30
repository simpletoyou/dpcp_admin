import template from './identity.html';
import controller from './identity.ctrl';
import './identity.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;