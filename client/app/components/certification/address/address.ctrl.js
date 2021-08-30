/**
 * author zhaojing
 */
class OrderController {

	constructor($scope, commonSvc,$location) {
		'ngInject';
		/**
		 * 注入的服务
		 */
		this.scope = $scope;
		this.commonSvc = commonSvc;
		this.$location = $location;
		this.init();

	}

	/**
	 * @return {null}
	 */
	init() {
		this.selectedBtn = 'current';
        this.keyWord = 'uid';
        this.keyWordVal = '';
        let url = this.$location.url();
        if(url.indexOf('history')>-1){
            this.selectedBtn = 'history';
		}
    }
    toggleTab(val){
        this.keyWordVal = '';
        this.selectedBtn = val;
        this.$location.path('/certification/address/'+val)
    }
}

export default OrderController;