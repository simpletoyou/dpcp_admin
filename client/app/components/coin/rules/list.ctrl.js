import config from '../config';
import mathTool from '../../../common/mathTool';

import passwordDialog from './passwordDialog.html';
import confirm from "../../confirm/confirm";

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, settingsSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = settingsSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.list = null;

        this.config = config;
        this.isLoading = false;


        // 提现列表
        this.withdrawList = angular.copy($scope.$root.$coinList).sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        })

        // 币种信息
        this.coinListMap = {};

        // 提现手续费数据
        this.withdrawFee = {};
        this.withdrawInput = {};

        // 提现最小额度
        this.withdrawMin = {};
        this.withdrawMinInput = {};

        // 提现最大额度
        this.withdrawMax = {};
        this.withdrawMaxInput = {};

        // $.map($scope.$root.$symbolList, (item, index) => {
        //     this.transactionFee[item.value] = '';
        //     this.transactionInput[item.value] = '';
        // });

        $.map($scope.$root.$coinList, (item, index) => {
            this.withdrawFee[item.value] = '';
            this.withdrawInput[item.value] = '';
        });

        this.depositMap = {};

        this.init();
    }

    init() {
        this._queryList();

        this.queryWithdrawFee();
        this.queryWithdrawMin();
        this.queryWithdrawMax();


        this.queryDeposit();
    }


    /**
     * 查询所有币种信息
     * @param {Function} callback
     */
    _queryList(callback) {
        let that = this;

        this.isLoading = true;
        // aaa, AAA                     // AAA
        $.when(this.service.coinList(), this.service.coinConfigList()).done((coinListRep, coinConfigListRep) => {
            this.isLoading = false;
            doCoinListRep(coinListRep);
            doCoinConfigListRep(coinConfigListRep);
            if ($.isFunction(callback) === true) {
                callback();
            }
        });

        function doCoinListRep(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                let list = rep.data;
                $.map(list, (item, index) => {
                    that.coinListMap[item.assetCode] = $.extend({}, item);
                    that.coinListMap[item.assetCode].origin = $.extend({}, item);
                });
            } else {
                window.toast(rep.msg);
            }
        }

        function doCoinConfigListRep(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                let list = rep.data;
                $.map(list, (item, index) => {
                    if (item.profileKey === config.ASSETCODECONFIRMNUM) {    // 1.网络确认数
                        that.coinListMap[item.assetCode][config.ASSETCODECONFIRMNUM] = item.profileValue;
                        that.coinListMap[item.assetCode][config.ASSETCODECONFIRMNUM + '_INPUT'] = '';
                    }
                    if (item.profileKey === config.DEPOSITLEVEL_DEFAULT) {    // 2.充值开关
                        that.coinListMap[item.assetCode][config.DEPOSITLEVEL_DEFAULT] = item.profileValue;
                        that.coinListMap[item.assetCode][config.DEPOSITLEVEL_DEFAULT + '_INPUT'] = '';
                    }
                    if (item.profileKey === config.WITHDRAWPRECISION) {    // 4.提现（钱包）精度
                        that.coinListMap[item.assetCode][config.WITHDRAWPRECISION] = item.profileValue;
                        that.coinListMap[item.assetCode][config.WITHDRAWPRECISION + '_INPUT'] = '';
                    }
                    if (item.profileKey === config.WITHDRAWMINFEE) {    // 5.提币手续费
                        that.coinListMap[item.assetCode][config.WITHDRAWMINFEE] = item.profileValue;
                        that.coinListMap[item.assetCode][config.WITHDRAWMINFEE + '_INPUT'] = '';
                    }
                    if (item.profileKey === config.WITHDRAWMIN) {       // 6.提币最小额
                        that.coinListMap[item.assetCode][config.WITHDRAWMIN] = item.profileValue;
                        that.coinListMap[item.assetCode][config.WITHDRAWMIN + '_INPUT'] = '';
                    }
                    if (item.profileKey === config.WITHDRAWMAX) {       // 7.提币最大额
                        that.coinListMap[item.assetCode][config.WITHDRAWMAX] = item.profileValue;
                        that.coinListMap[item.assetCode][config.WITHDRAWMAX + '_INPUT'] = '';
                    } else {
                        that.coinListMap[item.assetCode][item.profileKey] = item.profileValue;
                        that.coinListMap[item.assetCode][item.profileKey + '_INPUT'] = '';
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        }
    }

    _setWithdrawData(list) {
        $.map(list, (item, index) => {
            this.withdrawFee[item.assetCode] = item.profileValue || 0;
        });
    }

    /**
     * 查询提币手续费
     */
    queryWithdrawFee() {
        let param = {
            key: config.WITHDRAW_TYPE_FEE
        };
        this.service.configQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this._setWithdrawData(rep.data);
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 查询提币最小额度
     */
    queryWithdrawMin() {
        let param = {
            key: config.WITHDRAW_TYPE_MIN
        };
        this.service.configQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                $.map(rep.data, (item, index) => {
                    this.withdrawMin[item.assetCode] = item.profileValue || 0;
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    queryWithdrawMax() {
        let param = {
            key: config.WITHDRAW_TYPE_MAX
        };
        this.service.configQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                $.map(rep.data, (item, index) => {
                    this.withdrawMax[item.assetCode] = item.profileValue || 0;
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 充值列表
     */
    queryDeposit() {
        let param = {
            key: config.DEPOSITLEVEL_DEFAULT
        };
        this.service.configQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                $.map(rep.data, (item, index) => {
                    this.depositMap[item.assetCode] = item.profileValue;
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 充值更新
     * @param symbol
     * @param status
     * @param operText
     */
    updateDeposit(symbol, status, operText) {
        let that = this;

        confirm('确定要' + operText + symbol + '充值吗?', () => {

            let modalInstance = this.$uibModal.open({
                template: passwordDialog,
                scope: this.$scope,
                controller() {
                }
            });

            this.$scope.$$ok = function (password) {
                window.toast('请稍候...');
                that.service.configUpdate({
                    key: config.DEPOSITLEVEL_DEFAULT,
                    asset: symbol,
                    value: status
                }, {
                    'login-password': password
                }).then(rep => {
                    if(rep.code === window.CODE.SUCCESS){
                        window.toast('操作成功', {
                            callback() {
                                that.queryDeposit();
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

    /**
     * 更新提币手续费
     * @param symbol
     */
    updateWithdrawFee(symbol) {

        let value = this.withdrawInput[symbol];
        let that = this;

        if ($.trim(value) === '') {
            window.toast(`请输入${symbol}的提币手续费！`);
            return;
        }

        if (value < 0) {
            window.toast(`${symbol}的提币手续费必须 > 0`, {timeout: 4000});
            return;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            if (value === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                key: config.WITHDRAW_TYPE_FEE,
                asset: symbol,
                value: value
            };
            window.toast('请稍候...');
            that.service.configUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast(rep.msg);
                    that.withdrawInput[symbol] = '';
                    that.withdrawFee[symbol] = value;
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

    /**
     *
     * @param symbol
     */
    updateWithdrawMin(symbol) {

        let value = this.withdrawMinInput[symbol];
        let that = this;

        if ($.trim(value) === '') {
            window.toast(`请输入${symbol}的提币最小额度！`);
            return;
        }

        value = +value;

        if (value <= +this.withdrawFee[symbol]) {
            window.toast(`${symbol}的提币最小额度必须 > ${symbol}的提币手续费`, {timeout: 4000});
            return;
        }

        if (value >= +this.withdrawMax[symbol]) {
            window.toast(`${symbol}的提币最小额度必须 < ${symbol}的提币最大额度`, {timeout: 4000});
            return;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            if (value === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                key: config.WITHDRAW_TYPE_MIN,
                asset: symbol,
                value: value
            };
            window.toast('请稍候...');
            that.service.configUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast(rep.msg);
                    that.withdrawMinInput[symbol] = '';
                    that.withdrawMin[symbol] = value;
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

    /**
     *
     * @param symbol
     */
    updateWithdrawMax(symbol) {

        let value = this.withdrawMaxInput[symbol];
        let that = this;

        if ($.trim(value) === '') {
            window.toast(`请输入${symbol}的提币最大额度！`);
            return;
        }

        value = +value;

        if (value <= +this.withdrawMin[symbol]) {
            window.toast(`${symbol}的提币最大额度必须 > ${symbol}的提币最小额度`, {timeout: 4000});
            return;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            if (value === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                key: config.WITHDRAW_TYPE_MAX,
                asset: symbol,
                value: value
            };
            window.toast('请稍候...');
            that.service.configUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast(rep.msg);
                    that.withdrawMaxInput[symbol] = '';
                    that.withdrawMax[symbol] = value;
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


    /**
     * 添加白名单
     * */
    addWhiteListconfig(uid) {

        let that = this;

        if ($.trim(uid) === '') {
            window.toast(`请输入UID！`);
            return;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.addWhiteListconfig({
                uid: uid
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code===window.CODE.SUCCESS){
                    window.toast('请稍候...', {
                        callback() {
                            window.toast(rep.msg);
                            that.condition.uid = '';
                            that.queryWhiteListconfig();
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
    searchInfo(uid){
        this.$location.url('/commonusers/personalinfo?uid=' + uid);
    }

    /**
     * 删除白名单
     * */
    deleteWhiteListconfig(uid) {
        let that = this;

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.deleteWhiteListconfig({
                uid: uid
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('请稍候...', {
                        callback() {
                            window.toast(rep.msg);
                            that.queryWhiteListconfig();
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

    /**
     * 查询白名单
     * */
    queryWhiteListconfig() {
        let param = {
            pageNo: this.condition.pageNo,
            pageSize: this.condition.pageSize
        };

        this.isLoading = true;
        this.service.queryWhiteListconfig(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
            } else {
                window.toast(rep.msg);
            }
        })
    }


    remove(id) {

    }

    addUid() {

    }
}


export default ListController;
