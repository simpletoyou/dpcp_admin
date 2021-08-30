import template from './list.html';
import controller from './list.ctrl';
import './list.less';

let Component = {
  restrict: 'E',
  bindings: {
      keyword:'<',
      keywordval:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;