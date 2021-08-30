/**
 * author liubingli
 */
class BankcardController {
	/**
	 * @param  {Object} controller的私有作用域
	 * @param  {Object} 表格参数对象
	 * @param  {Object}	此controller的私有接口
	 * @param  {Object}	枚举类型接口
	 * @param  {Object}	公共接口
	 * @return {Object}
	 */
	constructor($scope, bankcardSVC, enumSvc, commonSvc) {
		'ngInject';
		this.scope = $scope;
		this.bankCardSvc = bankcardSVC;
		this.enumSvc = enumSvc;
		this.commonSvc = commonSvc;
		this.list = null;
		this.isLoading = true;
		this.init();
	}

	/**
	 * @return {null}
	 */
	init() {
		this.fetchList();
	}

	fetchList() {
		this.isLoading = true;
		this.bankCardSvc.userAcBank({
			channelType: 'OKPAY',
			pageNo: 1,
			pageSize: 30,
			uid: this.uid
		}).then(rep => {
			this.isLoading = false;
			if(rep.code === window.CODE.SUCCESS){
				this.list = rep.data.list;
				this.totalNum = rep.data.totalNum;
			}else{
				window.toast(rep.msg);
			}
		})
	}

}

export default BankcardController;