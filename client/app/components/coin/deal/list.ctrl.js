
import config from '../config';
import bigdecimal from 'bigdecimal'

class ListController {
	/**
	 *
	 * @param $scope
	 */
	constructor($scope, coinSvc, $state) {
		"ngInject";
		this.type = $state.params.type;

		this.$scope = $scope;
		this.service = coinSvc;

		this.list = null;

		this.config = config;
		this.isLoading = false;
		this.pageSize = config.PAGE_SIZE;
		// this.totalNum = 0;
		this.pageNum = 0;

		this.$scope.keyWord = 'buyTid';
		this.$scope.keyWordText = null;

		this.condition = {
            brokerId:'',
            symbol: $state.params.type.toUpperCase(),
			status: '',
			optType: config.TYPE_GOP_IN,
			pageNo: 1,
			pageSize: 30
		};
		this.init();
	}
	init() {
		this.fetchList();
		this.$scope.$watch('keyWord', (newValue, oldValue) => {
			this.$scope.keyWordText = '';
		});
	}

	pageChanged() {
		this.fetchList();
	}

	fetchList() {
		let param = Object.assign({}, this.condition);
		if (this.$scope.keyWordText) {
			param[this.$scope.keyWord] = this.$scope.keyWordText;
		}
		this.service.order(param).then(rep => {
			this.isLoading = false;
			if(rep.code===window.CODE.SUCCESS){
				this.list = getFormattedList(rep.data.list);
				// this.pageNum = rep.data.pageNum;
				this.totalNum = rep.data.pageNum * this.condition.pageSize;
			}else{
				window.toast(rep.msg);
			}
		})


        function getFormattedList(list) {
            if (list.length > 0) {
                $.map(list, (item, index) => {
                    item.price = new bigdecimal.BigDecimal(''+item.price).toPlainString();
                });
            }
            return list;
        }
	}
}


export default ListController;
