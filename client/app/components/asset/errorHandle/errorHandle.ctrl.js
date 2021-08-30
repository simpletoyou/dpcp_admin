/**
 * author gengmangmang
 */
class ListController {

	constructor($scope,  financeCheckSvc,  commonSvc) {
		'ngInject';
		/**
		 * 注入的服务
		 */
		this.scope = $scope;
		this.financeCheckSvc = financeCheckSvc;
		this.commonSvc = commonSvc;
		this.init();

	}

	/**
	 * @return {null}
	 */

	init() {
		this.selectedBtn = 'CURRENT';
	}

	toggleTab(val){
		this.selectedBtn = val;
	}


}

export default ListController;