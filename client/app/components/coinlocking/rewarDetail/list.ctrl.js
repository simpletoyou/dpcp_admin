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
    constructor($scope, rewarDetailSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = rewarDetailSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;
        this.$scope.coinList = $scope.$root.$coinList;
        // 搜索选项
        this.$scope.uid = '';
        this.$scope.assetCode= '';
        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            pageNo: 1,
            pageSize: config.PAGE_SIZE,
            assetCode: '',
        };

        this.init();
    }

    //返回创建时间
    returnCreateDate(date){
        // return date === '' ? this.$scope.$root.moment(date).format('YYYY-MM-DD') : ''
        let d = new Date(date)
        return this.$scope.$root.moment(d).format("YYYY-MM-DD")
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

    /**
     * 改变币的种类
     */

    changeCoinType(coinType) {
        console.log(this.condition.assetCode);
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
        this.service.selectTradeLockingRewarDetail(param).then(rep => {
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