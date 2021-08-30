/**
 * author liubingli
 */
class UserController {
	/**
	 * @param  {Object} controller的私有作用域
	 * @param  {Object} 表格参数对象
	 * @param  {Object}	此controller的私有接口
	 * @param  {Object}	枚举类型接口
	 * @param  {Object}	公共接口
	 * @return {Object}
	 */
	constructor($scope,$location,companySvc) {
		'ngInject';
		/**
		 * 注入的服务
		 */
		this.$scope = $scope;
		this.$location = $location;
		this.companySvc = companySvc;

		// this.items = [{
		// 	name:'资产概览',
		// 	type:'assetview'
		// },{
		// 	name:'企业人民币管理',
		// 	type:'rmbmanage'
		// },{
		// 	name:'批量代付',
		// 	type:'batchpay'
		// },{
		// 	name:'果仁出入管理',
		// 	type:'nutentry'
		// },{
		// 	name:'交易详情',
		// 	type:'tradedetail'
		// },{
		// 	name:'账目流水',
		// 	type:'account'
		// },{
		// 	name:'企业资质',
		// 	type:'companyIC'
		// }];

		this.transferType = 'rmbmanage';

		this.brokerId = this.$location.search().brokerId;

	}

	changeType(type){
		this.transferType = type;
	}

}

export default UserController;
