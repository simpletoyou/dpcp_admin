import template from './assetview.html';
import controller from './assetview.ctrl';
import './assetview.less';

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