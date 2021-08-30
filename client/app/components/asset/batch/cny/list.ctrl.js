/**
 * author zhaojing
 */
class ListController {

    constructor($scope, financeCheckSvc, commonSvc) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.scope = $scope;
        this.service = financeCheckSvc;
        this.commonSvc = commonSvc;

        this.list = null;
        // this.config = config;
        this.isLoading = false;
        // this.pageSize = config.PAGE_SIZE;
        this.totalNum = 3;
        // this.type = config.STATUS_CASH_IN_ALL.KEY;

        // this.$scope.keyWord = config.TYPE_SCREEN_CASH_IN_ID.KEY;
        // this.$scope.keyWordText = null;

        this.condition = {
            "pageNo": 1,
            "pageSize": 10,
            "assetType": "CNY"
        };
        this.init();

    }

    /**
     * @return {null}
     */
    init() {
        this.fetchList();
    }


    /**
     * 获取列表
     */
    fetchList() {
        let param = Object.assign({}, this.condition);
        this.isLoading = true;
        this.service.checkBatchList(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.totalNum = rep.data.totalNum;
                if(this.list!=null&&this.list.length>0) {
                    this.list.forEach(function (item) {
                        item.showDetail = false;
                    })
                }
            } else {
                window.toast(rep.msg);
            }
        })


    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    toggleDetail(item) {
        item.showDetail = !item.showDetail;
    }


}

export default ListController;


