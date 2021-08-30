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

        this.$scope.symbolList = [{
            label: 'UDC',
            value: 'UDC'
        }, {
            label: 'USDT',
            value: 'USDT'
        }];

        // 搜索选项
        this.$scope.symbol = this.$scope.symbolList[0].value;
        this.$scope.buyUid = '';
        this.$scope.sellUid = '';
        this.$scope.beginTime = '';
        this.$scope.endTime = '';
        this.$scope.tid = '';
        this.$scope.statusList = [{
                value: '',
                label: '全部'
            },
            {
                value: 'FINISHED',
                label: '交易完成'
            },
            {
                value: 'CANCELED',
                label: '交易取消'
            },
            {
                value: 'CLOSED',
                label: '交易关闭'
            },
            {
                value: 'OVERTIME',
                label: '交易超时'
            },
            {
                value: 'PAID',
                label: '已支付'
            },
            {
                value: 'UNPAY',
                label: '未支付'
            },
            {
                value: 'COMPLAINNING',
                label: '申诉中'
            },
        ]

        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            assetCode: this.$scope.symbolList[0].value,
            pageNo: 1,
            pageSize: config.PAGE_SIZE,
            status: ''
        };
        // 列表信息汇总
        this.totalInfo = {
            buyFee: 0,
            number: 0,
            amount: 0,
            sellFee: 0,
            total: 0
        }

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
    statusFun(item) {
        switch (item) {
            case "FINISHED":
                return "交易完成";
                break;
            case "CANCELED":
                return "交易取消";
                break;
            case "CLOSED":
                return "交易关闭";
                break;
            case "OVERTIME":
                return "交易超时";
                break;
            case "PAID":
                return "已支付";
                break;
            case "UNPAY":
                return "未支付";
                break;
            case "COMPLAINNING":
                return "申诉中";
                break;
            default:
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
        this.service.transInfo(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list
                this.totalNum = rep.data.pageNum * this.pageSize;
                this.totalInfo.number = rep.data.number;
                this.totalInfo.amount = rep.data.amount;
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
            param.transOrderId = this.$scope.tid;
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