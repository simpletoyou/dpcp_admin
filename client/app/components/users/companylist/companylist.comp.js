import template from './companylist.html';
import controller from './companylist.ctrl';
import './companylist.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;