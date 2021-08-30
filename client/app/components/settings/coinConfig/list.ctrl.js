/**
 * @author jinguangguo
 * @date 2018/1/30
 */
import mathTool from '../../../common/mathTool';
import passwordDialog from '../passwordDialog.html';
import confirm from "../../confirm/confirm";
import config from "../config";

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

        this.config = config;
        this.isLoading = true;
        this.coinListMap = {};

        this.levels = [0, 1, 2];
        this.limitList_level0 = {};
        this.limitList_level1 = {};
        this.limitList_level2 = {};

        this.showEdit = false
        this.rowdata = {}
        this.oldRowData = {}

        this.allChainList = [
            { name: 'ERC20', check: false, 'idx': 0 },
            { name: 'TRC20', check: false, 'idx': 1 },
            { name: 'BEP20', check: false, 'idx': 2 },
            { name: 'Heco', check: false, 'idx': 3 },
            { name: 'ONG', check: false, 'idx': 4 }]
        this.currentList = []

        this.init();

    }

    init() {
        this._queryList(() => {
            this._initLimitList();
            this._fetchLimitListByLevel();
        });
    }

    //判断公链是否已存进this.currentList，是的话取消选中，否则加入
    contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return i;
            }
        }
        return false;
    }

    // 点击公链触发事件
    Choose(val) {

        if (this.contains(this.currentList, val.name) === false) {
            this.currentList.push(val.name)

        } else {
            let idx = this.contains(this.currentList, val.name)
            this.currentList.splice(idx, 1)
        }
    }

    //数值乘100，直接Number(num) * 100会出现多0.14*100=14.000000000002情况
    getBasisMarginAlgor(num) {
        return Math.floor(Number(num) * 100)
    }

    //显示编辑窗口
    rowEdit(rowdata) {

        if (rowdata.modelKey == 'locking') {
            rowdata.AVAILABLE_PARAMETER = 0
            rowdata.MINING_POOL_PARAMETER = 0
        }
        this.currentList = []

        let that = this
        this.oldRowData = {}
        this.rowdata = rowdata
        this.oldRowData = JSON.parse(JSON.stringify(rowdata))
        let to = this.oldRowData
        for(let j of this.allChainList) {
            j.check = false
        }
        for(let i of this.oldRowData.tokenType) {
            for(let j of this.allChainList) {
                if(i == j.name) {
                    j.check = true
                }
            }
        }

        for(let i of this.allChainList) {
            if(i.check) {
                this.currentList.push(i.name)
            }
        }
        let getNum = that.getBasisMarginAlgor
        // 数据格式化
        to.AVAILABLE_PARAMETER = to.AVAILABLE_PARAMETER ? (getNum(to.AVAILABLE_PARAMETER)) : 0
        to.MINING_POOL_PARAMETER = getNum(to.MINING_POOL_PARAMETER)
        to.STATIC_FREED_RATE = getNum(to.STATIC_FREED_RATE)
        to.STATIC_FREED_UPPER_LIMIT = getNum(to.STATIC_FREED_UPPER_LIMIT)
        to.DYNAMIC_RATE_DIRECT_PUSH = getNum(to.DYNAMIC_RATE_DIRECT_PUSH)
        to.DYNAMIC_RATE_PARTNER = getNum(to.DYNAMIC_RATE_PARTNER)
        to.DYNAMIC_RATE_SUPER_NODE = getNum(to.DYNAMIC_RATE_SUPER_NODE)
        to.ASSETCODECONFIRMNUM = Number(to.ASSETCODECONFIRMNUM)
        to.WITHDRAWPRECISION = Number(to.WITHDRAWPRECISION)
        to.WITHDRAWMINFEE = Number(to.WITHDRAWMINFEE)
        to.WITHDRAWMIN = Number(to.WITHDRAWMIN)
        to.WITHDRAWMAX = Number(to.WITHDRAWMAX)
        this.showEdit = true
    }
    // 确认编辑
    confirmEdit(editData) {

        let that = this

        let rd = this.rowdata//修改前数据
        let ed = editData//修改后数据

        ed.tokenType = this.currentList

        let getNum = this.getBasisMarginAlgor

        if (!ed.assetCode) {
            return
        }

        rd.AVAILABLE_PARAMETER = Number(rd.AVAILABLE_PARAMETER)
        rd.MINING_POOL_PARAMETER = Number(rd.MINING_POOL_PARAMETER)
        rd.STATIC_FREED_RATE = Number(rd.STATIC_FREED_RATE)
        rd.STATIC_FREED_UPPER_LIMIT = Number(rd.STATIC_FREED_UPPER_LIMIT)
        rd.DYNAMIC_RATE_DIRECT_PUSH = Number(rd.DYNAMIC_RATE_DIRECT_PUSH)
        rd.DYNAMIC_RATE_PARTNER = Number(rd.DYNAMIC_RATE_PARTNER)
        rd.DYNAMIC_RATE_SUPER_NODE = Number(rd.DYNAMIC_RATE_SUPER_NODE)


        rd.ASSETCODECONFIRMNUM = Number(rd.ASSETCODECONFIRMNUM)


        rd.WITHDRAWPRECISION = Number(rd.WITHDRAWPRECISION)
        rd.WITHDRAWMINFEE = Number(rd.WITHDRAWMINFEE)
        rd.WITHDRAWMIN = Number(rd.WITHDRAWMIN)
        rd.WITHDRAWMAX = Number(rd.WITHDRAWMAX)



        if (rd.modelKey == ed.modelKey && rd.tokenType.toString() == ed.tokenType.toString() && getNum(rd.AVAILABLE_PARAMETER) == ed.AVAILABLE_PARAMETER && getNum(rd.MINING_POOL_PARAMETER) == ed.MINING_POOL_PARAMETER && getNum(rd.STATIC_FREED_RATE) == ed.STATIC_FREED_RATE && getNum(rd.STATIC_FREED_UPPER_LIMIT) == ed.STATIC_FREED_UPPER_LIMIT && getNum(rd.DYNAMIC_RATE_DIRECT_PUSH) == ed.DYNAMIC_RATE_DIRECT_PUSH && getNum(rd.DYNAMIC_RATE_PARTNER) == ed.DYNAMIC_RATE_PARTNER && getNum(rd.DYNAMIC_RATE_SUPER_NODE) == ed.DYNAMIC_RATE_SUPER_NODE && rd.ASSETCODECONFIRMNUM == ed.ASSETCODECONFIRMNUM && rd.WITHDRAWPRECISION == ed.WITHDRAWPRECISION && rd.WITHDRAWMINFEE == ed.WITHDRAWMINFEE && rd.WITHDRAWMIN == ed.WITHDRAWMIN && rd.WITHDRAWMAX == ed.WITHDRAWMAX && rd.DEPOSITLEVEL_DEFAULT == ed.DEPOSITLEVEL_DEFAULT && rd.status == ed.status) {
            window.toast('数据未修改');
            this.showEdit = false
            return
        }

        if (!ed.tokenType.length) {
            window.toast('请选择币种所支持公链');
            return;
        }

        if ($.trim(ed.AVAILABLE_PARAMETER) === '') {
            window.toast('请输入充值可用比例');
            return
        }
        if ($.trim(ed.STATIC_FREED_RATE) === '') {
            window.toast('请输入静态释放比例');
            return
        }
        if ($.trim(ed.STATIC_FREED_UPPER_LIMIT) === '') {
            window.toast('请输入静态释放上限');
            return
        }
        if ($.trim(ed.DYNAMIC_RATE_DIRECT_PUSH) === '') {
            window.toast('请输入直推比例');
            return
        }
        if ($.trim(ed.DYNAMIC_RATE_PARTNER) === '') {
            window.toast('请输入合伙人比例');
            return
        }

        if ($.trim(ed.DYNAMIC_RATE_SUPER_NODE) === '') {
            window.toast('请输入超级节点比例');
            return
        }
        if ($.trim(ed.ASSETCODECONFIRMNUM) === '') {
            window.toast('请输入网络确认数');
            return
        }

        if ($.trim(ed.WITHDRAWPRECISION) === '') {
            window.toast('请输入提币精度');
            return
        }
        if ($.trim(ed.WITHDRAWMINFEE) === '') {
            window.toast('请输入提币手续费');
            return
        }
        if ($.trim(ed.WITHDRAWMIN) === '') {
            window.toast('请输入提币最小额度');
            return
        }
        if ($.trim(ed.WITHDRAWMAX) === '') {
            window.toast('请输入提币最大额度');
            return
        }


        confirm('确认要进行该操作吗？', () => {
            let modalInstance = that.$uibModal.open({
                template: passwordDialog,
                scope: that.$scope,
                controller() {
                }
            });

            that.$scope.$$ok = function (password) {
                window.toast('请稍候...');
                // 模型 // 充值可用比例
                // 静态释放比例
                // 静态释放上限
                // 直推
                // 合伙人
                // 超级节点

                if (rd.modelKey != ed.modelKey || getNum(rd.AVAILABLE_PARAMETER) != ed.AVAILABLE_PARAMETER || getNum(rd.MINING_POOL_PARAMETER) != ed.MINING_POOL_PARAMETER || getNum(rd.STATIC_FREED_RATE) != ed.STATIC_FREED_RATE || getNum(rd.STATIC_FREED_UPPER_LIMIT) != ed.STATIC_FREED_UPPER_LIMIT || getNum(rd.DYNAMIC_RATE_DIRECT_PUSH) != ed.DYNAMIC_RATE_DIRECT_PUSH || getNum(rd.DYNAMIC_RATE_PARTNER) != ed.DYNAMIC_RATE_PARTNER || getNum(rd.DYNAMIC_RATE_SUPER_NODE) != ed.DYNAMIC_RATE_SUPER_NODE) {
                    //    币种数据编辑接口
                    that.updateCoinType(ed, password)
                }

               

                if (rd.tokenType != ed.tokenType) {
                    that.updateChain(ed.assetCode, ed.tokenType, password)
                }

                // 网络确认数
                if (ed.ASSETCODECONFIRMNUM != rd.ASSETCODECONFIRMNUM) {
                    that.update(ed.assetCode, that.config.ASSETCODECONFIRMNUM, ed.ASSETCODECONFIRMNUM, password)
                }

                // 提币（钱包）精度
                if (ed.WITHDRAWPRECISION != rd.WITHDRAWPRECISION) {
                    that.update(ed.assetCode, that.config.WITHDRAWPRECISION, ed.WITHDRAWPRECISION, password)
                }
                // 提币手续费
                if (ed.WITHDRAWMINFEE != rd.WITHDRAWMINFEE) {
                    that.update(ed.assetCode, that.config.WITHDRAWMINFEE, ed.WITHDRAWMINFEE, password)
                }
                // 提币最小额度
                if (ed.WITHDRAWMIN != rd.WITHDRAWMIN) {
                    that.update(ed.assetCode, that.config.WITHDRAWMIN, ed.WITHDRAWMIN, password)
                }
                // 提币最大额度
                if (ed.WITHDRAWMAX != rd.WITHDRAWMAX) {
                    that.update(ed.assetCode, that.config.WITHDRAWMAX, ed.WITHDRAWMAX, password)
                }
                // 充值开关
                if (ed.DEPOSITLEVEL_DEFAULT != rd.DEPOSITLEVEL_DEFAULT) {
                    that.updateDeposit(ed.assetCode, ed.DEPOSITLEVEL_DEFAULT, password)
                }
                // 功能开关
                if (ed.status != rd.status) {

                    that.updateStatus(ed, ed.status, password)
                }

                setTimeout(() => {
                    modalInstance.dismiss('ok');
                    that.oldRowData = {}
                    that.showEdit = false
                }, 500)

            };

            that.$scope.$$cancel = function () {
                modalInstance.dismiss('cancel');
            };

        });

    }

    _initLimitList() {
        $.map(this.coinListMap, (item, index) => {
            this.levels.forEach((level, index) => {
                this['limitList_level' + level][item.assetCode] = {
                    limit: null,
                    update: null,
                    isEdit: false
                };
            });
        });
    }

    _fetchLimitListByLevel() {
        this.levels.forEach((item) => {
            let param = {
                key: config['WITHDRAWLEVEL_' + item]
            };

            this.service.configQuery(param).then(rep => {
                this.isLoading = false;
                if (rep.code === window.CODE.SUCCESS) {
                    let list = rep.data;
                    let temp = this['limitList_level' + item];
                    $.map(list, (item) => {
                        temp[item.assetCode] = {
                            limit: item.profileValue,
                            update: null,
                            isEdit: false
                        };
                    });
                } else {
                    window.toast(rep.msg);
                }
            })
        })

    }
    // 更新币种数据
    updateCoinType(data, pwd) {
        let that = this
        let param = {
            assetCode: data.assetCode.toUpperCase(),
            brokerId: 10003,
            status: data.status,     // 币种默认状态
            name: data.name,
            icon: data.icon,
            // 选填
            currencyType: data.currencyType,   // 币种类型，默认coin，暂时都是COIN类型
            supplyAmount: data.supplyAmount,    // 官方流通量，暂时不用
            totalAmount: data.totalAmount,
            minPrecision: data.minPrecision,
            description: data.description,

            modelKey: data.modelKey === 'available' ? 'AVAILABLE_MODEL_KEY' : 'LOCKING_AVAILABLE_MODEL_KEY',
            staticFreedRate: data.STATIC_FREED_RATE,
            staticFreedUpperLimit: data.STATIC_FREED_UPPER_LIMIT,
            dynamicDirectPush: data.DYNAMIC_RATE_DIRECT_PUSH,
            dynamicNormalUser: 0,
            dynamicPartner: data.DYNAMIC_RATE_PARTNER,
            dynamicSuperNode: data.DYNAMIC_RATE_SUPER_NODE,
            availableParameter: data.AVAILABLE_PARAMETER,
            miningPoolParameter: 100 - data.AVAILABLE_PARAMETER,
            webUrl: '0'
        };

        // 需要判断可用或限制可用显示充值可用及充值矿池比例
        that.service.coinAdd(param, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === '100200') {
                window.toast('操作成功', {
                    callback() {
                        window.location.reload();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });

    }

    /**
     * 更新每日提币限额
     * @param
     */
    updateLimitByLevel(assetType, updateVal, level) {
        let that = this;

        if ($.trim(updateVal) === '') {
            window.toast(`请输入${assetType}的提币每日限额！`);
            return;
        }

        let modalInstance = this.$uibModal.open({
            animation: false,
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (value) {
            if (value === '') {
                window.toast('请输入当前账号密码');
                return;
            }

            window.toast('请稍候...');
            that.service.coinConfigUpdate({
                key: config['WITHDRAWLEVEL_' + level],
                asset: assetType,
                value: updateVal
            }, {
                'login-password': value
            }).then(rep => {

                if (rep.code === window.CODE.SUCCESS) {
                    window.toast(rep.msg);
                    modalInstance.dismiss('ok');
                    that._fetchLimitListByLevel();
                    that['limitList_level' + level][assetType].isEdit = false;
                } else {
                    window.toast(rep.msg);
                }
            })
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            this.$scope.$$password = '';
        });
    }

    _queryList(callback) {
        let that = this;

        this.isLoading = true;
        // aaa, AAA                     // AAA
        $.when(this.service.coinList(), this.service.coinConfigList(), this.service.selectAmountRate({ key: "UNLOCKING_RATE" })).done((coinListRep, coinConfigListRep, rateRep) => {
            this.isLoading = false;
            doCoinListRep(coinListRep);
            doCoinConfigListRep(coinConfigListRep);
            doCoinRate(rateRep);
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
        function doCoinRate(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                let list = rep.data;
                $.each(list, (key, value) => {
                    if (!that.coinListMap[key]) {
                        return
                    }
                    that.coinListMap[key]['rate'] = value;
                })
            } else {
                window.toast(rep.msg);
            }
        }
        function doCoinConfigListRep(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                let list = rep.data;
                $.map(list, (item, index) => {
                    // 以返回的币种列表为准，不存在的则返回
                    if (!that.coinListMap[item.assetCode]) {
                        return
                    }

                    if (item.profileKey === config.MODELKEY_1 || item.profileKey === config.MODELKEY_2) {
                        // 1.模型
                        that.coinListMap[item.assetCode].modelKey = item.profileValue;
                    }


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

    /**
     * 查询提币手续费
     */
    queryWithdrawFee() {
        let param = {
            key: config.WITHDRAW_TYPE_FEE
        };
        this.service.configQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                // this._setWithdrawData(rep.data);
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

    update(assetCode, key, value, pwd) {
        let that = this;
        that.service.coinConfigUpdate({
            asset: assetCode,
            key: key,
            value: value
        }, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('操作成功', {
                    callback() {
                        that._queryList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    updateChain(assetCode, tokenType, pwd) {
        let that = this;
        that.service.chainUpdate({
            assetCode: assetCode,
            tokenType: tokenType,
        }, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('操作成功', {
                    callback() {
                        that._queryList();
                    }
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
    updateDeposit(symbol, status, pwd) {

        let that = this;

        that.service.coinConfigUpdate({
            key: config.DEPOSITLEVEL_DEFAULT,
            asset: symbol,
            value: status
        }, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('操作成功', {
                    callback() {
                        that._queryList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    updateStatus(item, status, pwd) {
        let that = this;
        let param = $.extend({}, item.origin, {
            status: status
        });
        param.availableParameter = item.availableParameter ? item.availableParameter : 0
        param.dynamicDirectPush = item.DYNAMIC_RATE_DIRECT_PUSH
        param.dynamicPartner = item.DYNAMIC_RATE_PARTNER
        param.dynamicSuperNode = item.DYNAMIC_RATE_SUPER_NODE
        param.miningPoolParameter = param.availableParameter >= 0 ? 100 - param.availableParameter : 0
        param.modelKey = item.modelKey === "locking" ? 'LOCKING_AVAILABLE_MODEL_KEY' : 'AVAILABLE_MODEL_KEY'
        param.staticFreedRate = item.STATIC_FREED_RATE
        param.staticFreedUpperLimit = item.STATIC_FREED_UPPER_LIMIT

        that.service.coinAdd(param, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('操作成功', {
                    callback() {
                        that._queryList();
                    }
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
            window.toast(`${symbol}的提币手续费必须 > 0`, { timeout: 4000 });
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
            that.service.coinConfigUpdate(param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast(rep.msg);
                    that.withdrawInput[symbol] = '';
                    that.withdrawFee[symbol] = value;
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
            window.toast(`${symbol}的提币最小额度必须 > ${symbol}的提币手续费`, { timeout: 4000 });
            return;
        }

        if (value >= +this.withdrawMax[symbol]) {
            window.toast(`${symbol}的提币最小额度必须 < ${symbol}的提币最大额度`, { timeout: 4000 });
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
            that.service.coinConfigUpdate(param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast(rep.msg);
                    that.withdrawMinInput[symbol] = '';
                    that.withdrawMin[symbol] = value;
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
            window.toast(`${symbol}的提币最大额度必须 > ${symbol}的提币最小额度`, { timeout: 4000 });
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
            that.service.coinConfigUpdate(param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast(rep.msg);
                    that.withdrawMaxInput[symbol] = '';
                    that.withdrawMax[symbol] = value;
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
}


export default ListController;
