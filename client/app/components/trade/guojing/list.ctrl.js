const config = {
    PAGE_SIZE: 10,
}
// import coinConfig from '../../../common/coinConfig';

import MathTool from '../../../common/mathTool'

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, tradeControlSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = tradeControlSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;
        this.coinType = 'APA';
        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        this.$scope.symbolList = $scope.$root.$symbolList;

        this.$scope.beginTime = '';
        this.$scope.endTime = '';

        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            pageNo: 1,
            pageSize: config.PAGE_SIZE,
            // coinType:this.coinType
        };
        // 列表信息汇总
        this.totalInfo = {
            buyFee: 0,
            number: 0,
            amount: 0,
            sellFee: 0,
            total: 0
        }

        this.init();
        //赋值币种
        // this.$scope.coinList = $scope.$root.$coinList;
        this.$scope.coinList = [{label:'APA',value:'APA'}];
    }

    init() {
        this.fetchList();
        //当筛选类别改变时清空搜索框
        // this.$scope.$watch('keyWord', (newValue, oldValue) => {
        //     this.$scope.keyWordText = '';
        // });
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }
    //返回用户状态
    returnUserState(state){
        switch(state){
            case 'SUCCESS':
                return '成功'
                break;
            case 'ERROR':
                return '失败'
                break;
        }
    }
    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        // $.get('http://localhost:7777/exchange_manager/trade-glide/tradeGlideList?startDate=2018-07-16+00:00:00',data=>{
        //     this.isLoading = false;
        //     this.list = data.data.list;
        //     this.totalNum = data.data.pageNum * this.pageSize;
        //     console.log(data);
        // })
        this.service.tradeGlideList(param).then(data=>{
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            this.list = data.data.list;
            this.totalNum = data.data.pageNum * this.pageSize;
            console.log(data)
        });
    }
    /**
     * 合并搜索选项
     */
    mergeSearch(param) {
        if (this.$scope.userSearch) {
            param.winmaxUserId = this.$scope.userSearch
        }
        if (this.$scope.beginTime instanceof Date) {
            param.startDate = this.$scope.$root.moment(this.$scope.beginTime).format('YYYY-MM-DD+HH:mm:ss');
        }
        if (this.$scope.endTime instanceof Date) {
            param.endDate = this.$scope.$root.moment(this.$scope.endTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }

    changeSymbol() {
        // console.log(this.condition.symbol)
    }
    /**
     * 日期起始时间变化
     * @param {Date | *} beginTime
     */
    changeStartDate(beginTime) {
        if (beginTime instanceof Date) {
            this.$scope.min = this.$scope.$root.moment(beginTime).add(1, 'days').format('YYYY-MM-DD');
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = false;
        } else {
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = true;
        }
    }

    changeEndDate(endTime) {}
}


export default ListController;
