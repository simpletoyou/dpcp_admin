import config from '../config';
import passwordDialog from './passwordDialog.html';
import refuseDialog from './refuseDialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, coinSvc, $uibModal, $location, $state, commonSvc) {
        "ngInject";

        this.$scope = $scope;
        this.service = coinSvc;
        this.commonSvc = commonSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;
        // 待审核个数
        this.unverifyMap = {};

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        this.$scope.coinList = $scope.$root.$coinList;
        this.$scope.coinType = $state.params.type.toUpperCase();

        // 拒绝选项
        this.$scope.$$refuseOptions = config.REFUSE_OPTIONS;


        this.condition = {
            assetCode: $state.params.type.toUpperCase(),
            status: 'UNTREATED', // 所有待审核的记录
            pageNo: 1,
            pageSize: config.PAGE_SIZE
        };
        this.init();
    }

    init() {
        this.condition.pageNo = 1;
        this.fetchList();
        this.updateUnverifyNum();
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }


    /**
     * 更新未审核个数
     */
    updateUnverifyNum() {
        this.commonSvc.unverifyNums().then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                let data = rep.data;
                // console.log(data)
                $.extend(this.unverifyMap, data.withdrawCoinMap);
                // setDomKyc(data.identificationInitNum, data.residenceInitNum);
                // setDomWithdraw(data.withdrawCoinMap);
            } else {
                window.toast(rep.msg);
            }
        });
    }


    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, this.condition);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        this.service.getUnProcessedCoinWithdrawList(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {

                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    /*
     * 提现审核, 同意
     * @param
     * */
    confirm(obj, val) {
        let that = this;
        let id = obj.id;
        if (obj.putforwardStatus == 1) {
            confirm('该用户提现已被冻结，请和其他管理员确认。点击确定将同意资产提现', () => {
                that.submitOk(id, that)
            });
        } else {
            that.submitOk(id, that)
        }

    }
    //发送通过申请
    submitOk(id, that) {
        let confirmParam = {
            assetCode: this.$scope.coinType,
            id: id,
            confirm: config.OPT_TYPE_ADOPT.KEY
        };
        // if(val&&val==='agree'){
        //     this.$scope.dialogName = config.OPT_TYPE_ADOPT.VALUE;
        //     confirmParam.confirm = config.OPT_TYPE_ADOPT.KEY;
        // }else if(val&&val==='refuse'){
        //     this.$scope.dialogName = config.OPT_TYPE_REFUSE.VALUE;
        //     confirmParam.confirm = config.OPT_TYPE_REFUSE.KEY;
        // }
        this.$scope.dialogName = config.OPT_TYPE_ADOPT.VALUE;


        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            that.service.coinConfirm(confirmParam, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast('操作中……', {
                        callback() {
                            window.toast(rep.msg);
                            // that.condition.pageNo = 1;
                            // that.fetchList();
                            // that.$scope.$root.updateMenuUnverifyNum();
                            that.init();
                        }
                    });
                } else {
                    window.toast(rep.msg);
                }
            });
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }
    /**
     * 提现审核，拒绝
     */
    refuse(id) {
        let that = this;
        let confirmParam = {
            assetCode: this.$scope.coinType,
            id: id,
            confirm: config.OPT_TYPE_REFUSE.KEY
        };



        this.$scope.dialogName = config.OPT_TYPE_REFUSE.VALUE;


        let modalInstance = this.$uibModal.open({
            template: refuseDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$refuse = function (password, reasonCode, reasonText) {
            // 30000其他理由
            if (reasonCode === '30000') {
                confirmParam.refuseMs = reasonText;
            } else {
                confirmParam.refuseMs = reasonCode;
            }
            that.service.coinConfirm(confirmParam, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast('操作中……', {
                        callback() {
                            window.toast(rep.msg);
                            // that.condition.pageNo = 1;
                            // that.fetchList();
                            // that.$scope.$root.updateMenuUnverifyNum();
                            that.init();
                        }
                    });
                } else {
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
    searchInfo(data) {
        this.userid = data;
        this.$location.url('/commonusers/personalinfo?uid=' + this.userid);
    }

    /**
     * 改变币的种类
     */

    changeCoinType(coinType) {
        this.$location.url(`/coincheck/${coinType}`);
    }
}


export default ListController;