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
    constructor($scope, cooperationSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = cooperationSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;
        this.pageNo = 1;
        this.id = '';
        this.selectlList = [{
            label: '全部',
            value: '全部'
        }, {
            label: '平台奖励',
            value: 'PLATFORM_REWARD'
        }, {
            label: '节点收益分配',
            value: 'NODE_PROFIT'
        }, {
            label: '节点奖励',
            value: 'NODE_REWARD'
        }];
        this.status = '全部';
        this.init();
    }

    init() {
        this.fetchList();
        //当筛选类别改变时清空搜索框
        // this.$scope.$watch('keyWord', (newValue, oldValue) => {
        //     this.$scope.keyWordText = '';
        // });
    }
    pageChanged(val) {
        //带参数的查询
        this.fetchList();
    }

    statusFun(item) {
        switch (item) {
            case "INIT":
                return "组队中";
                break;
            case "PROCESSING":
                return "挖矿中";
                break;
            case "OVER":
                return "挖矿结束";
                break;
            case "ESTABLISHING":
                return "组队完成";
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
        let param = Object.assign({}, {
            pageNo: this.pageNo,
            pageSize: this.pageSize
        });
        this.mergeSearch(param);

        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.service.getNodeProfit(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.data.records
                this.totalNum = rep.data.data.pages * this.pageSize;
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
        if (this.id) {
            param.nodeId = this.id
        }
        if (this.status != '全部') {
            param.type = this.status
        }
    }
}


export default ListController;