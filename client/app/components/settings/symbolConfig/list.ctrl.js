import config from '../config';
import mathTool from '../../../common/mathTool';

import passwordDialog from '../passwordDialog.html';
import confirm from "../../confirm/confirm";

const STATUS_NOT_OPEN = 'INIT';
const STATUS_HAS_OPEN = 'LISTED';
const STATUS_CLOSED = 'DELISTED';

class ListController {
    constructor($scope, settingsSvc, tradeControlSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = settingsSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        // 用于交易开关
        this.tradeControlSvc = tradeControlSvc;

        this.config = config;


        // ================================ 交易手续费
        this.isListLoading = true;

        // ================================ 交易开关 和 手续费列表写在一个list里面了
        this.list = [];


        this.STATUS_NOT_OPEN = STATUS_NOT_OPEN;
        this.STATUS_HAS_OPEN = STATUS_HAS_OPEN;
        this.STATUS_CLOSED = STATUS_CLOSED;
        this.tip1 = false;
        this.tip2 = false;
        this.tip3 = false;
        this.tip4 = false;

        this.showEdit = false
        this.rowdata = {}
        this.oldRowData = {}

        this.regionList = [
            {
                label: '标准区',
                value: 'STANDRARD'
            },
            {
                label: '创新区',
                value: 'INNOVATION'
            },
            {
                label: '解封区',
                value: 'UNSEALING'
            },  
        ]

        this.init();
    }

    init() {
        this._fetchTotalList();
    }

    // 根据symbol获取展示的类型
    _getSymbolView(symbol) {
        return symbol.split('_').reverse().join('/');
    }

    // ================================================================================================================================================ 交易对 开关 费率 获取列表 刷新
    _fetchTotalList() {
        let that = this;

        this.isListLoading = true;

        $.when(this._fetchSymbolList(), this.tradeControlSvc.profileList()).done((symbolListRep, configListRep) => {
            this.isListLoading = false;

            // console.log('交易对开关',repSwitch.data.slice(0,5));
            // console.log('费率',feeRep.data.slice(0,5));

            let symbolList = [];

            // 交易对初始化列表
            if (symbolListRep.code === window.CODE.SUCCESS) {
                symbolList = getSymbolMap(symbolListRep.data);
            } else {
                window.toast(symbolListRep.msg);
            }

            // 交易对配置列表
            if (configListRep.code === window.CODE.SUCCESS) {
                symbolList = getConfigMap(configListRep.data, symbolList);
                that.list = symbolList;
            } else {
                window.toast(configListRep.msg);
            }

            /**
             * 将交易对的初始化信息融到symbolList
             * @param list
             * @returns {Array}
             */
            function getSymbolMap(list) {
                let resArr = [];
                let coinList = that.$scope.$root.$symbolList;

                // 根据全局 coinSymbolList  将相应的币种放入数组中
                for (let i = 0; i < coinList.length; i++) {
                    for (let j = 0; j < list.length; j++) {
                        if (coinList[i].value === list[j].symbol) {
                            resArr.push(list[j]);
                        }
                    }
                }
                return resArr;
            }

            /**
             * 将两个列表，即配置列表融到symbolList中
             * @param configList
             * @param symbolList
             */
            function getConfigMap(configList, symbolList) {
                $.map(configList, (item, index) => {
                    // item.profileValue = mathTool.multiplication(item.profileValue, 100) || 0;

                    for (let i = 0; i < symbolList.length; i++) {
                        if (item.symbol === symbolList[i].symbol) {

                            // 判断配置项
                            if (item.profileKey === config.ASSETFEERATE) {    // 1.网络确认数
                                symbolList[i][config.ASSETFEERATE] = mathTool.multiplication(item.profileValue, 100) || 0;
                                symbolList[i][config.ASSETFEERATE + '_INPUT'] = '';
                            } else  if (item.profileKey === config.MATCH_LOCKING_AVAILABL) {    // 1.网络确认数
                                symbolList[i][config.MATCH_LOCKING_AVAILABL] = mathTool.multiplication(item.profileValue, 100) || 0;
                                symbolList[i][config.MATCH_LOCKING_AVAILABL + '_INPUT'] = '';
                            }  else {
                                symbolList[i][item.profileKey] = item.profileValue;
                                symbolList[i][item.profileKey + '_INPUT'] = '';
                            }

                        }
                    }
                });
                return symbolList;
            }

        });
    }

    _fetchSymbolList() {
        return this.tradeControlSvc.list({
            pageNo: 0,
            pageSize: 500
        });
    }

    explain(num) {
        if(num==1){
            this.tip1 = true;
        } else if(num==2) {
            this.tip2 = true;
        } else if(num==3){
            this.tip3 = true;
        } else {
            this.tip4 = true;
        }
       
    }
    out(num) {
        if(num==1){
            this.tip1 = false;
        } else if(num==2) {
            this.tip2 = false;
        } else if(num==3) {
            this.tip3 = false;
        } else {
            this.tip4 = false;
        }
        
    }

    //显示编辑窗口
    rowEdit(rowdata) {
        this.oldRowData ={}
        this.rowdata = rowdata
        this.oldRowData = JSON.parse(JSON.stringify(rowdata))
        let to = this.oldRowData
        //判空
       to.MATCH_LOCKING_AVAILABL = to.MATCH_LOCKING_AVAILABL?to.MATCH_LOCKING_AVAILABL:0
       to.FIXED_PRICE_UP_RATE = to.FIXED_PRICE_UP_RATE?to.FIXED_PRICE_UP_RATE:0
       to.DAY_UNLOCKING_RATE = to.DAY_UNLOCKING_RATE?to.DAY_UNLOCKING_RATE:0
       to.MAX_DAY_UNLOCKING_RATE =to.MAX_DAY_UNLOCKING_RATE?to.MAX_DAY_UNLOCKING_RATE:0
        //字符串转数值
       to.rank = parseFloat(to.rank)
       to.AMOUNTPRECISION = parseFloat(to.AMOUNTPRECISION)
       to.PRICEPRECISION = parseFloat(to.PRICEPRECISION)
       to.HIGHLIGHTNO = parseFloat(to.HIGHLIGHTNO)
       to.ASSETFEERATE = parseFloat(to.ASSETFEERATE)
       to.MATCH_LOCKING_AVAILABL = parseFloat(to.MATCH_LOCKING_AVAILABL)
       to.FIXED_PRICE_UP_RATE = parseFloat(to.FIXED_PRICE_UP_RATE)
       to.DAY_UNLOCKING_RATE = parseFloat(to.DAY_UNLOCKING_RATE)
       to.MAX_DAY_UNLOCKING_RATE = parseFloat(to.MAX_DAY_UNLOCKING_RATE)
       to.INVITE_UNLOCKING_REWARD_RATE = parseFloat(to.INVITE_UNLOCKING_REWARD_RATE)
       to.TOP_INVITE_UNLOCKING_REWARD_RATE = parseFloat(to.TOP_INVITE_UNLOCKING_REWARD_RATE)
       to.DAY_LOCKING_SELL_NUMBER = parseFloat(to.DAY_LOCKING_SELL_NUMBER)
        this.showEdit = true
    }
    //确认更新
    confirmEdit(editData) {

        let that = this

        if(!editData.id) {
            return
        }
        let tr = that.rowdata

        tr.rank = Number(tr.rank)
        tr.AMOUNTPRECISION = Number(tr.AMOUNTPRECISION)
        tr.PRICEPRECISION = Number(tr.PRICEPRECISION)
        tr.HIGHLIGHTNO = Number(tr.HIGHLIGHTNO)
        tr.ASSETFEERATE = Number(tr.ASSETFEERATE)
        tr.MATCH_LOCKING_AVAILABL = Number(tr.MATCH_LOCKING_AVAILABL)
        tr.FIXED_PRICE_UP_RATE = Number(tr.FIXED_PRICE_UP_RATE)
        tr.DAY_LOCKING_SELL_NUMBER = Number(tr.DAY_LOCKING_SELL_NUMBER)

        console.log('修改后/前数据对比：'+editData.rank,tr.rank,editData.AMOUNTPRECISION, tr.AMOUNTPRECISION,editData.PRICEPRECISION, tr.PRICEPRECISION,editData.HIGHLIGHTNO, tr.HIGHLIGHTNO,editData.ASSETFEERATE, tr.ASSETFEERATE,editData.MATCH_LOCKING_AVAILABL, tr.MATCH_LOCKING_AVAILABL,editData.FIXED_PRICE_UP_RATE, tr.FIXED_PRICE_UP_RATE,editData.DAY_LOCKING_SELL_NUMBER, tr.DAY_LOCKING_SELL_NUMBER,editData.region, tr.region,editData.SHOWSTATUS, tr.SHOWSTATUS, editData.status, tr.status)
        
        if(editData.rank === tr.rank && editData.AMOUNTPRECISION === tr.AMOUNTPRECISION && editData.PRICEPRECISION === tr.PRICEPRECISION && editData.HIGHLIGHTNO === tr.HIGHLIGHTNO && editData.ASSETFEERATE === tr.ASSETFEERATE && editData.MATCH_LOCKING_AVAILABL === tr.MATCH_LOCKING_AVAILABL && editData.FIXED_PRICE_UP_RATE === tr.FIXED_PRICE_UP_RATE && editData.DAY_LOCKING_SELL_NUMBER === tr.DAY_LOCKING_SELL_NUMBER && editData.region === tr.region && editData.SHOWSTATUS === tr.SHOWSTATUS&& editData.status === tr.status) {
            window.toast('数据未修改');
            this.showEdit = false
            return
        }

        if($.trim(editData.rank) === '') {
            window.toast('请输入当前币种排名');
            return
        }
        if($.trim(editData.AMOUNTPRECISION) === '') {
            window.toast('请输入交易币种数量精度');
            return
        }
        if($.trim(editData.PRICEPRECISION) === '') {
            window.toast('请输入计价币种价格精度');
            return
        }
        if($.trim(editData.HIGHLIGHTNO) === '') {
            window.toast('请输入计价币种高亮位数');
            return
        }
        if($.trim(editData.ASSETFEERATE) === '') {
            window.toast('请输入交易手续费');
            return
        }
        if($.trim(editData.MATCH_LOCKING_AVAILABL) === '') {
            window.toast('请输入锁仓可用比例');
            return
        }
        if($.trim(editData.FIXED_PRICE_UP_RATE) === '') {
            window.toast('请输入价格上浮系数');
            return
        }
        if($.trim(editData.DAY_LOCKING_SELL_NUMBER) === '') {
            window.toast('请输入当天可一键卖出次数');
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
                // 排名
                if(editData.rank != tr.rank) {
                   
                    that.update(editData.symbol, 'rank', editData.rank,password)
                }
                //数量精度
                if(editData.AMOUNTPRECISION != tr.AMOUNTPRECISION) {
                    that.update(editData.symbol, that.config.AMOUNTPRECISION, editData.AMOUNTPRECISION,password)
                }
                //价格精度
                if(editData.PRICEPRECISION != tr.PRICEPRECISION) {
                    that.update(editData.symbol, that.config.PRICEPRECISION, editData.PRICEPRECISION,password)
                }
                //高亮位数
                if(editData.HIGHLIGHTNO != tr.HIGHLIGHTNO) {
                    that.update(editData.symbol, that.config.HIGHLIGHTNO, editData.HIGHLIGHTNO,password)
                }
                //交易手续费
                if(editData.ASSETFEERATE != tr.ASSETFEERATE) {
                    that.updateTransactionFee(editData.symbol, editData.ASSETFEERATE,password)
                }
                //锁仓可用比列
                if(editData.MATCH_LOCKING_AVAILABL != tr.MATCH_LOCKING_AVAILABL) {
                    that.updateLock(editData.symbol,that.config.MATCH_LOCKING_AVAILABL, editData.MATCH_LOCKING_AVAILABL,password)
                }
                //价格上浮系数
                if(editData.FIXED_PRICE_UP_RATE != tr.FIXED_PRICE_UP_RATE) {
                    that.update(editData.symbol, that.config.FIXED_PRICE_UP_RATE, editData.FIXED_PRICE_UP_RATE,password)
                }
                //当天可一键卖出次数
                if(editData.DAY_LOCKING_SELL_NUMBER != tr.DAY_LOCKING_SELL_NUMBER) {
                    that.update(editData.symbol, that.config.DAY_LOCKING_SELL_NUMBER, editData.DAY_LOCKING_SELL_NUMBER,password)
                }
                //交易区
                if(editData.region != tr.region) {
                    that.updateSymbolRegion(editData.id, editData.region)
                }
                //挂单开关
                if(editData.status != tr.status) {
                    that.updateStatus(editData,editData.status,password)
                }
                //前台展示开关
                if(editData.SHOWSTATUS != tr.SHOWSTATUS) {
                    that.updateShow(editData.symbol, that.config.SHOWSTATUS, editData.SHOWSTATUS,password)
                }

                setTimeout(()=>{
                    modalInstance.dismiss('ok');
                    that.oldRowData ={}
                    that.showEdit = false
                },500)

            };

            that.$scope.$$cancel = function () {
                modalInstance.dismiss('cancel');
            };

        });
        
    }

    update(symbol1, key1, value1,pwd) {

        let that = this;

        let api1 = key1 == 'rank' ? 'updateUp' : 'update'

        that.tradeControlSvc[api1]({
            configSymbol: symbol1,
            key: key1,
            value: value1
        }, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                that.showEdit = false
                window.toast('操作成功', {
                    callback() {
                        that._fetchTotalList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    updateLock(symbol2, key2, value2,pwd) {

        let that = this

        if ($.trim(value2) === '') {
            window.toast(`输入不可为空！`);
            return;
        }


        let api2 = key2 == 'rank' ? 'updateUp' : 'update'

        that.tradeControlSvc[api2]({
            configSymbol: symbol2,
            key: key2,
            value: mathTool.division(value2, 100)
        }, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                that.showEdit = false
                window.toast('操作成功', {
                    callback() {
                        that._fetchTotalList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });


       
    }

     /**
     * 更新交易手续费
     * @param symbol
     * @param value
     */
      updateTransactionFee(symbol3, value3,pwd) {

        let that = this;  

        if ($.trim(value3) === '') {
            window.toast(`请输入${this._getSymbolView(symbol3)}的交易手续费！`);
            return;
        }

        let param3 = {
            key: config.ASSETFEERATE,
            configSymbol: symbol3,
            value: mathTool.division(value3, 100)
        };
        that.service.transactionUpdate(param3, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                that.showEdit = false
                window.toast(rep.msg);
                that.init();
                that.service.SymbolRegion();
            } else {
                window.toast(rep.msg);
            }
        });



    }

    /**
     * 更新交易区
     * @param symbol
     * @param value
     */
    updateSymbolRegion(id4, value4) {
        let that = this;

        if ($.trim(value4) === '') {
            window.toast(`请选择交易对分区！`);
            return;
        }


        let param4 = {
            region: value4,
            id: id4
        };
        return this.service.SymbolRegion(param4).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                that.showEdit = false
                window.toast(rep.msg);
                that.init();
            } else {
                window.toast(rep.msg);
            }
        });

    }


    updateShow(symbol, key, value,pwd) {
        let that = this;

        that.tradeControlSvc.update({
            configSymbol: symbol,
            key: key,
            value: value
        }, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                that.showEdit = false
                window.toast('操作成功', {
                    callback() {
                        that._fetchTotalList();
                    }
                });
            } else {
                window.toast('操作失败，'+rep.msg);
            }
        });
    }

    /**
     * 更新交易对开关状态
     */
    updateStatus(item, status,pwd) {
        let that = this;
        let form = {
            symbol: item.symbol,
            assetCode1: item.assetCode1,
            assetCode2: item.assetCode2,
            title: item.title,
            name: item.name,
            description: item.description,
            minPrecision1: item.minPrecision1,
            minPrecision2: item.minPrecision2,
            minAmount1: item.minAmount1,
            minAmount2: item.minAmount2,
            maxAmount1: item.maxAmount1,
            maxAmount2: item.maxAmount2,
            status: status,
            pricePrecision: item.pricePrecision,
            amountPrecision: item.amountPrecision,
            highlightNo: item.highlightNo
        };
        that._updateAjax(that, form,pwd);
    }

    _updateAjax(that, form,pwd) {

        that.tradeControlSvc.updateConfigSymbol(form, {
            'login-password': pwd
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                that.showEdit = false
                window.toast('操作成功', {
                    callback() {
                        that._fetchTotalList();
                    }
                });
            } else {
                that.isListLoading = false;
                window.toast('操作失败，'+rep.msg);
            }
        });
        
    }


    // =================================================================================================================================== 交易手续费
    _updateOneTransactionFee(symbol, value) {
        this.list.some((item, index) => {
            if (item.symbol === symbol) {
                item.profileValue = value;
                item.transactionFeeInputValue = '';
                return true;
            }
        })
    }

    /**
     * 查询交易手续费
     */
    queryTransactionFee() {
        let that = this;
        let param = {
            key: config.TRANSACTION_KEY
        };
        return this.service.transactionQuery(param);
    }



}


export default ListController;
