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
    constructor($scope, freezeThawRecordSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = freezeThawRecordSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        // 搜索选项
        this.$scope.uid = '';
        this.$scope.statusList = [{
                value: 'REGISTER_REWARD',
                label: '注册'
            },
            {
                value: 'INFLOW_COMPUT_POWER',
                label: '外围算力'
            },
            {
                value: 'LOTTERY_REWARD',
                label: '抽奖'
            },
            {
                value: 'INVITE_REWARD',
                label: '邀请'
            }
        ]
        this.$scope.typeList = [{
                value: 'UNFREEZE',
                label: '解冻'
            },
            {
                value: 'FREEZE',
                label: '冻结'
            }
        ]
        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            pageNo: 1,
            pageSize: config.PAGE_SIZE,
            amountLockType: this.$scope.statusList[0].value,
            amountType: this.$scope.typeList[0].value,
        };

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
        this.service.selectUserLockInfoByRules(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list
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
        if (this.$scope.uid) {
            param.uid = this.$scope.uid
        }
    }
}


export default ListController;