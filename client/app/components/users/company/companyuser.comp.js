import template from './companyuser.html';
import controller from './companyuser.ctrl';
import './companyuser.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;