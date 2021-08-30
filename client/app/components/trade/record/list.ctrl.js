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

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        this.$scope.symbolList = $scope.$root.$symbolList;

        // 搜索选项
        // this.$scope.symbol = this.$scope.symbolList[0].value;
        this.$scope.buyUid = '';
        this.$scope.sellUid = '';
        this.$scope.beginTime = '';
        this.$scope.endTime = '';
        this.$scope.tid = '';
        this.$scope.url = '';
        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            symbol: this.$scope.symbolList[0].value,
            pageNo: 1,
            pageSize: config.PAGE_SIZE
        };
        // 列表信息汇总
        this.totalInfo = {
            buyFee: 0,
            number: 0,
            amount: 0,
            sellFee: 0,
            total: 0
        }

        this.urlParam = []

        // 发送请求时的交易对
        this.fetchedSymbol = {
            pricing: this.$scope.symbolList[0].value.split('_')[0],
            trade: this.$scope.symbolList[0].value.split('_')[1]
        }

        this.init();
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

    download() {
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        let url = window.location.href;
        if(url.indexOf('manager.smt-ex.com') >-1){
            this.$scope.url = '//manager.smt-ex.com'
        }else if(url.indexOf('http://manager.smt-ex.com/')>-1){
            this.$scope.url = '//http://manager.smt-ex.com/'
        }else{
            this.$scope.url = '//http://192.168.0.104:8180'
        }
        this.urlParam = []
        for (let i in param) {
            this.urlParam.push({
                key: i,
                value: param[i]
            })
        }

        setTimeout(() => {
            $('#download').click()
        }, 500)
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
        this.service.fetchTradeRecord(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                // 设置请求时的交易对
                this.fetchedSymbol.pricing = param.symbol.split('_')[0];
                this.fetchedSymbol.trade = param.symbol.split('_')[1];

                // 列表汇总信息
                this.totalInfo.number = rep.data.number;
                this.totalInfo.buyFee = rep.data.buyFee;
                this.totalInfo.sellFee = rep.data.sellFee;
                this.totalInfo.amount = rep.data.amount;
                this.totalInfo.total = rep.data.total;


                // 展示列表
                this.list = rep.data.list.map(item => {
                    item.priceAll = MathTool.multiplication(item.num, item.price) || 0
                    return item
                });
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    //查看个人信息
    // searchInfo(data) {
    //     this.userid = data;
    //     this.$location.url('/commonusers/personalinfo?uid=' + this.userid);
    // }
    /**
     * 合并搜索选项
     */
    mergeSearch(param) {
        if (this.$scope.buyUid) {
            param.buyUid = this.$scope.buyUid
        }

        if (this.$scope.sellUid) {
            param.sellUid = this.$scope.sellUid
        }

        if (this.$scope.tid) {
            param.tid = this.$scope.tid;
        }
        if (this.$scope.beginTime instanceof Date) {
            param.beginTime = this.$scope.$root.moment(this.$scope.beginTime).format('YYYY-MM-DD HH:mm:ss');
        }
        if (this.$scope.endTime instanceof Date) {
            param.endTime = this.$scope.$root.moment(this.$scope.endTime).format('YYYY-MM-DD HH:mm:ss');
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
