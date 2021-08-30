import config from '../config';
// import coinConfig from '../../../common/coinConfig';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, coinSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = coinSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        // this.$scope.keyWord = 'id';
        // this.$scope.keyWordText = null;
        // this.$scope.coinList = coinConfig.coinList;
        this.$scope.coinList = $scope.$root.$coinList;

        this.$scope.coinType = $state.params.type.toUpperCase();

        // 搜索选项
        // this.$scope.id = '';
        this.$scope.uId = '';
        this.$scope.address = '';
        this.$scope.beginTime = '';
        this.$scope.endTime = '';
        this.$scope.email = '';

        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;

        this.condition = {
            assetCode: $state.params.type.toUpperCase(),
            status: '',
            pageNo: 1,
            pageSize: config.PAGE_SIZE
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

    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, this.condition);
        // if (this.$scope.keyWordText) {
        //     param[this.$scope.keyWord] = this.$scope.keyWordText;
        // }
        this.mergeSearch(param);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        this.service.getCoinDepositList(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    //查看个人信息
    searchInfo(data) {
        this.userid = data;
        this.$location.url('/commonusers/personalinfo?uid=' + this.userid);
    }
    /**
     * 合并搜索选项
     */
    mergeSearch(param) {
        if (this.$scope.uId) {
            if (/@/.test(this.$scope.uId)) {
                param.email = this.$scope.uId;
            } else {
                param.uId = this.$scope.uId;
            }
        }
        if (this.$scope.address) {
            param.address = this.$scope.address;
        }

        if (this.$scope.beginTime instanceof Date) {
            param.beginTime = this.$scope.$root.moment(this.$scope.beginTime).format('YYYY-MM-DD HH:mm:ss');
        }
        if (this.$scope.endTime instanceof Date) {
            param.endTime = this.$scope.$root.moment(this.$scope.endTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
    /**
     * 改变币的种类
     */

    changeCoinType(coinType) {
        this.$location.url(`/coinin/${coinType}`);
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
