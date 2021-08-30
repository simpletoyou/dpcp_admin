/**
 * author zhaojing
 */
class OrderController {

	constructor($scope, commonSvc) {
		'ngInject';
		/**
		 * 注入的服务
		 */
		this.scope = $scope;
		this.commonSvc = commonSvc;
		this.init();

	}

	/**
	 * @return {null}
	 */
	init() {
		this.selectedBtn = 'CNY';
	}
    toggleTab(val){
        this.selectedBtn = val;
    }
}

export default OrderController;