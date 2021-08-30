import config from '../config';
import mathTool from '../../../common/mathTool';
import util from '../../../common/filter/util';

import passwordDialog from '../passwordDialog.html';
import confirm from "../../confirm/confirm";

const DAY_TIMESTAMP = 24 * 60 * 60 * 1000;

const STATUS_NOT_OPEN = 'INIT';
const STATUS_HAS_OPEN = 'LISTED';
const STATUS_CLOSED = 'DELISTED';
const STATUS_PRE_OPEN = 'PRELISTED';    // 预售阶段，需要入场券

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, smcFundSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = smcFundSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.STATUS_NOT_OPEN = STATUS_NOT_OPEN;
        this.STATUS_HAS_OPEN = STATUS_HAS_OPEN;
        this.STATUS_PRE_OPEN = STATUS_PRE_OPEN;

        this.isLoading = true;

        this.isLoadingPre = true;

        this.condition = {
            pageNo: 1,
            pageSize: 100
        };

        this.preList = [];

        this.ticketStatus = ''; // ON/OFF
        this.fundBeginDate = '';
        this.fundEndDate = '';

        this.fundDay = '';

        this.inputBeginDate = '';
        this.inputFundDay = '';

        this.init();
    }

    init() {
        this.queryTicketConfig();
        // this.queryIncomeBeginData();
        // this.queryIncomeEndData();
        this.queryIncomeData();

        this.fetchPreConfig();
    }

    /**
     * 根据开始和结束时间计算收益天数
     * @private
     */
    _getFundDay() {

    }

    /**
     * 查询入场开关状态
     */
    queryTicketConfig() {
        let param = {
            pageNo: 1,
            pageSize: 100,
            fundAssetCode: 'SMCF1',
            key: 'TICKETSTATUS'
        };
        this.service.configQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                if (rep.data.list.length === 0) {
                    this.ticketStatus = 'OFF';   // 默认是关闭状态
                } else {
                    this.ticketStatus = rep.data.list[0].profileValue;
                }
            } else {
                window.toast(rep.msg);
            }
        });
    }

    queryIncomeData() {
        let param = {
            pageNo: 1,
            pageSize: 100,
            fundAssetCode: 'SMCF1',
            key: ''
        };
        this.isLoading = true;
        this.service.configQuery(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                let list = rep.data.list;
                if (list.length > 0) {
                    $.map(list, (item, index) => {
                        if (item.profileKey === "FUNDBEGINDATE") {
                            this.fundBeginDate = +item.profileValue;
                        } else if (item.profileKey === "FUNDENDDATE") {
                            this.fundEndDate = +item.profileValue;
                        }
                    });

                    // 计算天数
                    // console.log('this.fundBeginDate:' + this.fundBeginDate);
                    // console.log('this.fundEndDate:' + this.fundEndDate);
                    // console.log((this.fundEndDate - this.fundBeginDate) / DAY_TIMESTAMP);
                    // console.log(Math.floor((this.fundEndDate - this.fundBeginDate) / DAY_TIMESTAMP, 2));

                    if (this.fundBeginDate && this.fundEndDate) {
                        this.fundDay = util.floorFix((this.fundEndDate - this.fundBeginDate) / DAY_TIMESTAMP, 2);
                    }
                } else {
                    this.fundBeginDate = '';
                    this.fundEndDate = '';
                }


                // if (rep.data.list.length === 0) {
                //     this.fundBeginDate = '';
                // } else {
                //     this.fundBeginDate = +rep.data.list[0].profileValue;
                // }
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 查询服务开始时间
     */
    queryIncomeBeginData() {
        let param = {
            pageNo: 1,
            pageSize: 100,
            fundAssetCode: 'SMCF1',
            key: 'FUNDBEGINDATE'
        };
        this.isLoading = true;
        this.service.configQuery(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                if (rep.data.list.length === 0) {
                    this.fundBeginDate = '';
                } else {
                    this.fundBeginDate = +rep.data.list[0].profileValue;
                }
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 查询服务结束时间
     */
    queryIncomeEndData() {
        let param = {
            pageNo: 1,
            pageSize: 100,
            fundAssetCode: 'SMCF1',
            key: 'FUNDENDDATE'
        };
        this.service.configQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                if (rep.data.list.length === 0) {
                    this.fundEndDate = '';
                } else {
                    let endDate = +rep.data.list[0].profileValue;
                    this.fundEndDate = +rep.data.list[0].profileValue;
                }
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 更新入场券状态
     * @param status
     */
    updateTicketStatus(status) {

        let that = this;

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                fundAssetCode: 'SMCF1',
                key: 'TICKETSTATUS',
                value: status
            };
            window.toast('请稍候...');
            that.service.configUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast(rep.msg);
                    that.queryTicketConfig();
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

    updateFundBeginDate() {

        let that = this;
        let value = this.inputBeginDate;
        let timestamp;

        let reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;

        if (reg.test(value) === false) {
            window.toast('请按照YYYY-MM-DD HH:mm:ss填写开始时间');
            return;
        }
        timestamp = new Date(value).getTime();

        if (timestamp <= new Date().getTime()) {
            window.toast('开始时间必须>当前时间');
            return;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                fundAssetCode: 'SMCF1',
                key: 'FUNDBEGINDATE',
                value: timestamp
            };
            window.toast('请稍候...');
            that.service.configUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    // window.toast(rep.msg);
                    that.inputBeginDate = '';

                    // 更新结束时间
                    if (that.fundDay > 0) {
                        let endDate = timestamp + +that.fundDay * DAY_TIMESTAMP;
                        let param = {
                            fundAssetCode: 'SMCF1',
                            key: 'FUNDENDDATE',
                            value: endDate
                        };
                        that.service.configUpdate(param, {
                            'login-password': password
                        }).then(rep => {
                            if(rep.code === window.CODE.SUCCESS){
                                window.toast(rep.msg);
                                that.queryIncomeData();
                            }else{
                                window.toast(rep.msg);
                            }
                        });
                    }
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


    updateFundEndDate() {

        let that = this;
        let value = this.inputFundDay;
        let reg = /^\d+$/;

        if ($.trim(value) === '') {
            window.toast('请输入收益天数！');
            return;
        }

        if (reg.test(value) === false) {
            window.toast('请输入整数！');
            return;
        }

        let endDate = this.fundBeginDate + value * DAY_TIMESTAMP;

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                fundAssetCode: 'SMCF1',
                key: 'FUNDENDDATE',
                value: endDate
            };
            window.toast('请稍候...');
            that.service.configUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast(rep.msg);
                    this.inputFundDay = '';
                    that.queryIncomeData();
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

    // ********* 这里是基金活动开关的配置 **********
    /**
     * 获取活动开关的列表
     */
    fetchPreConfig() {
        this.isLoadingPre = true;
        this.service.preList({
            pageNo: 1,
            pageSize: 100
        }).then(rep => {
            this.isLoadingPre = false;
            this.preList = rep.data.list;
        });
    }

    /**
     *
     * @param fundAssetCode
     * @param tradeAssetCode
     * @param status
     * @param operText
     */
    update(fundAssetCode, tradeAssetCode, status, operText) {
        let that = this;
        confirm('确定要开启' + operText + '交易对' + `${tradeAssetCode}_${tradeAssetCode}` + '吗?', () => {

            let modalInstance = this.$uibModal.open({
                template: passwordDialog,
                scope: this.$scope,
                controller() {
                }
            });

            this.$scope.$$ok = function (password) {
                window.toast('请稍候...');
                that.service.preUpdate({
                    fundAssetCode: fundAssetCode,
                    tradeAssetCode: tradeAssetCode,
                    status: status
                }, {
                    'login-password': password
                }).then(rep => {
                    if(rep.code === window.CODE.SUCCESS){
                        window.toast('操作成功', {
                            callback() {
                                that.fetchPreConfig();
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

        });
    }

}


export default ListController;
