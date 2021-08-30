/**
 * author liubingli
 */
class AddController {
	/**
	 * @param  {Object} controller的私有作用域
	 * @param  {Object} 表格参数对象
	 * @param  {Object}	此controller的私有接口
	 * @param  {Object}	枚举类型接口
	 * @param  {Object}	公共接口
	 * @return {Object}
	 */
	constructor($scope, orderAddSvc, enumSvc, commonSvc) {
		'ngInject';
		/**
		 * 注入的服务
		 */
		this.scope = $scope;
		this.orderAddSvc = orderAddSvc;
		this.enumSvc = enumSvc;
		this.commonSvc = commonSvc;
		this.formData = {};
		this.formFileds = [{"key":"orderId","type":"input","templateOptions":{"type":"text","label":"订单号","placeholder":"输入订单号","required":true}},{"type":"select","key":"orderType","templateOptions":{"label":"订单类型","options":[{"value":0,"name":"全部"},{"value":1,"name":"线上订单"}]}}];

		this.init();

	}

	/**
	 * @return {null}
	 */
	init() {

		this.resetForm();

	}

	submit() {
		let formData = this.getSubmitFormData();
		this.orderAddSvc
			.add(formData)
			.then(data => {
				alert('成功');
			});
	}

	/**
	 * @returns {{}} form数据集合
	 */
	getSubmitFormData() {
		let formData = this.formData,
			sendFormData = {
			};

		$.extend(sendFormData, formData);

		return sendFormData;
	}

	/**
	 * 重置
	 */
	resetForm() {
		let formData = this.formData;

		Object.keys(formData).forEach(function(key){
			formData[key] = '';
		})
	}
}

export default AddController;