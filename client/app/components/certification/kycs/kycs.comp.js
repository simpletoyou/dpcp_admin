import template from './kycs.html';
import controller from './kycs.ctrl';
import './kycs.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;