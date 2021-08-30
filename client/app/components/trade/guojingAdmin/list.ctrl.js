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

        this.$scope.beginTime = '';
        this.$scope.endTime = '';

        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            pageNo: 1,
            pageSize: config.PAGE_SIZE
        };

        this.init();
        //赋值币种
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

    // 解除冻结/冻结
    setFrozen(obj,name){
        let param = {
            winmaxUserId:obj.winmaxUserId,
            lockStatus: name == 'lockStatus' ? (obj.lockStatus == 'LOCK' ? 'UNLOCK' : 'LOCK') : obj.lockStatus,
            outLockStatus: name == 'outLockStatus' ? (obj.outLockStatus == 'LOCK' ? 'UNLOCK' : 'LOCK') : obj.outLockStatus,
        };
        this.service.updateAccountStates(param).then(data=>{
            this.fetchList();
        });
    }
    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = {
            pageNo: 1,
            pageSize: 10,
        };
        this.mergeSearch(param);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        this.service.selectAccountStates(param).then(data=>{
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
