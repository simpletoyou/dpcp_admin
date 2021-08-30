import config from '../config';

import passwordDialog from '../passwordDialog.html';

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

        this.condition = {
            uid: '',
            pageNo: 1,
            pageSize: 100
        };

        // 交易手续费数据
        this.transactionFee = {};
        this.transactionInput = {};

        // 提现手续费数据
        this.withdrawFee = {};
        this.withdrawInput = {};

        // 提现最小额度
        this.withdrawMin = {};
        this.withdrawMinInput = {};

        // 提现最大额度
        this.withdrawMax = {};
        this.withdrawMaxInput = {};

        $.map($scope.$root.$symbolList, (item, index) => {
            this.transactionFee[item.value] = '';
            this.transactionInput[item.value] = '';
        });

        $.map($scope.$root.$coinList, (item, index) => {
            this.withdrawFee[item.value] = '';
            this.withdrawInput[item.value] = '';
        });

        
        this.init();
    }

    init() {
        this.queryTransactionFee();

        this.queryWithdrawFee();
        this.queryWithdrawMin();
        this.queryWithdrawMax();

        this.queryWhiteListconfig();
    }

    _setTransactionData(list) {
        $.map(list, (item, index) => {
            this.transactionFee[item.symbol] = item.profileValue * 100 || 0;
        });
    }

    /**
     * 查询交易手续费
     */
    queryTransactionFee() {
        let param = {
            key: config.TRANSACTION_KEY
        };
        this.service.transactionQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this._setTransactionData(rep.data);
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 更新交易手续费
     * @param symbol
     */
    updateTransactionFee(symbol) {
        let value = this.transactionInput[symbol];
        let that = this;

        if ($.trim(value) === '') {
            window.toast(`请输入${getSymbolView(symbol)}的交易手续费！`);
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
                key: config.TRANSACTION_KEY,
                configSymbol: symbol,
                value: value / 100
            };
            window.toast('请稍候...');
            that.service.transactionUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast(rep.msg);
                    that.transactionInput[symbol] = '';
                    that.transactionFee[symbol] = value;
                }else{
                    window.toast(rep.msg);
                }
            });
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };

        function getSymbolView(symbol) {
            let arrs = symbol.split('_');
            return arrs[1] + '/' + arrs[0];
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
        this.service.withdrawQuery(param).then(rep => {
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
        this.service.withdrawQuery(param).then(rep => {
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
        this.service.withdrawQuery(param).then(rep => {
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
            that.service.withdrawUpdate(param, {
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
            that.service.withdrawUpdate(param, {
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
            that.service.withdrawUpdate(param, {
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
