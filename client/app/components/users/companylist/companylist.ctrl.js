/**
 * author liubingli
 */
class listController {
	/**
	 * @param  {Object} controller的私有作用域
	 * @param  {Object} 表格参数对象
	 * @param  {Object}	此controller的私有接口
	 * @param  {Object}	枚举类型接口
	 * @param  {Object}	公共接口
	 * @return {Object}
	 */
	constructor($scope,$location,companyListSvc) {
		'ngInject';
		/**
		 * 注入的服务
		 */
		this.$location = $location;
		this.service = companyListSvc;

		this.isLoading = true;
		this.condition = {
			pageNo: 1,
			pageSize: 30
		};

		this.getCompanyList();
	}

	getCompanyList(){

		let param = Object.assign({}, this.condition);
		this.isLoading = true;
		this.service.businessList(param).then(rep => {
			this.isLoading = false;
			if(rep.code===window.CODE.SUCCESS){
				this.list = rep.data.list;
				this.pageNum = rep.data.pageNum;
				this.totalNum = rep.data.totalNum;
			}else{
				window.toast(rep.msg);
			}
		});

	}

	changeToCompany(item){
		console.log(this.tableParams);
		this.$location.url('/users/company?brokerId='+item.id);
	}

}

export default listController;
