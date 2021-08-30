
import config from '../config';
import passwordDialog from './passwordDialog.html';

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

        this.$scope.coinList = $scope.$root.$coinList;
        this.$scope.coinType = $state.params.type.toUpperCase();

        // 状态选项
        this.$scope.statusList = config.STATUS_OPTIONS;

        // 搜索选项
        // this.$scope.id = '';
        this.$scope.uId = '';
        this.$scope.address = '';
        this.$scope.beginTime = '';
        this.$scope.endTime = '';
        this.$scope.email = '';
        this.url = '';

        this.fees = {
            yesterdayFee: '',
            feeSum: ''
        },

        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            assetCode: $state.params.type.toUpperCase(),
            status: 'PROCESSED', // todo，这里需要所有审核过的记录
            pageNo: 1,
            pageSize: config.PAGE_SIZE
        };

        this.urlParam = [];
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

    //导出列表
    download(){
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        let url = window.location.href;
        if(url.indexOf('manager.smt-ex.com') >-1){
            this.$scope.url = '//manager.smt-ex.com'
        }else if(url.indexOf('http://manager.smt-ex.com/')>-1){
            this.$scope.url = '//http://manager.smt-ex.com/'
        }
        this.urlParam = []
        for (let i in param) {
            this.urlParam.push({
                key: i,
                value: param[i]
            })
        }
        // return false
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
        this.service.getProcessedCoinWithdrawList(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if(rep.code===window.CODE.SUCCESS){

                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            }else{
                window.toast(rep.msg);
            }
        })
        if(param.assetCode == '') {
            param.assetCode = 'btc'
        }
        let param2 = {
            assetCode: param.assetCode,
            isUpdate:false
        }
        this.service.getFees(param2).then(rep => {
            if(rep.code == '100200') {
            this.fees = rep.data
            }
        })
    }

     /*
    * 更新手续费
    * @param
    * */
    updateFees() {
        let param = {
            assetCode: this.$scope.coinType,
            isUpdate: true
        }
        this.service.getFees(param).then(rep => {
            if(rep.code == '100200') {
            this.fees = rep.data
            }
        })
    }

    /*
    * 提现审核
    * @param
    * */
    confirm(id,val){
        let that = this;
        let confirmParam = {
            assetCode: this.$scope.coinType,
            id : id,
            confirm : ""
        };
        if(val&&val==='agree'){
            this.$scope.dialogName = config.OPT_TYPE_ADOPT.VALUE;
            confirmParam.confirm = config.OPT_TYPE_ADOPT.KEY;
        }else if(val&&val==='refuse'){
            this.$scope.dialogName = config.OPT_TYPE_REFUSE.VALUE;
            confirmParam.confirm = config.OPT_TYPE_REFUSE.KEY;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.coinConfirm(confirmParam, {
                'login-password': password
            }).then(rep => {
                if(rep.code===window.CODE.SUCCESS){
                    window.toast('操作中……', {
                        callback() {
                            window.toast(rep.msg);
                            that.condition.pageNo = 1;
                            that.fetchList();
                            that.$scope.$root.updateMenuUnverifyNum();
                        }
                    });
                }else{
                    window.toast(rep.msg);
                }
            });
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }

    //查看个人信息
    searchInfo(data){
        this.userid=data;
        this.$location.url('/commonusers/personalinfo?uid='+this.userid);
    }

    /**
     * 合并搜索选项
     */
    mergeSearch(param) {
        if (this.$scope.uId) {
            param.uId = this.$scope.uId;
        }
        if (this.$scope.address) {
            param.address = this.$scope.address;
        }
        if (this.$scope.email) {
            param.email = this.$scope.email;
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

       
        this.$location.url(`/coinout/${coinType}`);


    }

    /**
     * 日期起始时间变化
     * @param {Date | *} beginTime
     */
    changeStartDate(beginTime) {
        if (beginTime instanceof Date) {
            this.$scope.min = this.$scope.$root.moment(beginTime).format('YYYY-MM-DD');
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = false;
        } else {
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = true;
        }
    }

    changeEndDate(endTime) {
    }
}


export default ListController;
