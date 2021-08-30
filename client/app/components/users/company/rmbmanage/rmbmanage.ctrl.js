/**
 * author liubingli
 */

class RmbManageController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope,  rmbManageSvc) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.$scope = $scope;
        this.rmbManageSvc = rmbManageSvc;

        this.financeList = [];
        this.uidList = [];

        this.condition = {
            uid: '',
            assetCode: 'BTC',
            amount: '',
            pageNo: 1,
            pageSize: 10,
            type: ''
        };
        this.rmbUsed = 0;
        this.rmbLocked = 0;
        this.totalNum = 0;
        this.list = [];

        this.types = [{
            'key': 0,
            'value': '全部类型'
        }, {
            'key': 1,
            'value': 'IN'
        }, {
            'key': 2,
            'value': 'OUT'
        }];

        this.operationList1 = [
            { name: '可用', enname: 'AVAILABLE' }
            , { name: '锁仓', enname: 'LOCKING' }
            , { name: '限制可用', enname: 'LOCKING_AVAILABLE' }
        ];
        this.operationList2 = [
            { name: '可用', enname: 'AVAILABLE' }
            , { name: '锁仓', enname: 'LOCKING' }
            , { name: '限制可用', enname: 'LOCKING_AVAILABLE' }
        ];
        this.operationType1= '可用';
        this.operationType2= '可用';

        // 资产类型
        this.currentAsset = {};

        this.init();
    }

    init() {
        // this.getFinance();
    }

    searchList() {
        if(!this.condition.uid) {
            window.toast('请输入账户uid');
            return
        }
        if (this.condition.uid) {
            let params = {
                pageNo: this.condition.pageNo,
                pageSize: this.condition.pageSize,
                brokerId: this.brokerid,
                assetCode: this.condition.assetCode,
                uid: this.condition.uid,
            };
            if (this.condition.type) {
                params.type = this.condition.type
            }
            
            this.rmbManageSvc.listInfo(params).then((rep) => {
                if (rep.code === window.CODE.SUCCESS) {
                    this.list = rep.data.list;
                    this.totalNum = rep.data.pageNum * this.condition.pageSize;
                }
            }, (err) => {
                console.log('err');
            });

            this.getFinance();
        }


        // this.tableParams = new this.{
        //     count: 30
        // }, {
        //     getData: (params) => {
        //         let formData = angular.extend(this.getSearchFormData() || {}, {
        //             pageNo: params.url().page // 查询第几页
        //         }, {
        //             pageSize: params.count() // 一页多少个
        //         },{
        //         	brokerId:this.brokerid,
        //             assetCode:'USD',
        //             uid:this.condition.uid
        //         });
        //
        //         return this.rmbManageSvc.listInfo(formData).then((data) => {
        //             params.total((data.data && data.data.totalNum) || 1); // 一共多少条
        //             return (data.data && data.data['list']) || []; // 每页的数据
        //         },(err) =>{
        //         	console.log('err');
        //         });
        //     }
        // });
    }

    // 筛选条件
    getSearchFormData() {
        // console.log(this.getFormDataType);
        let type;
        if (this.getFormDataType.key != 0) {
            type = this.getFormDataType.value;
        }
        let formData = {
            type: type  //不加type表示数据全拿到
        };
        return formData;
    };

    getFinance() {
        this.isLoading = true;
        let params = {
            brokerId: this.brokerid,
            pageSize: 100,
            pageNo: 1,
            uid: this.condition.uid
        };
        this.rmbManageSvc.businessFinance(params).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                // this.formatFinanceData(rep.data.list);

                // 总资产
                let list = rep.data.list;

                this.financeList = list;

                if (list.length > 0) {

                    console.log(JSON.stringify(this.condition));

                    // 设置uid列表
                    // this._setUidList();

                    // this.condition.uid = this.condition.uid || list[0].uid.toString();

                    // 获取当前资产详细
                    this._setCurrentAsset();

                    // 过滤搜素
                    // this.searchList();
                }

            }
        }, err => {
            console.log('err');
        });
    }

    _setUidList() {
        let list = [];
        let firstUid = this.financeList[0].uid;
        list.push(firstUid);
        let tempUid = firstUid;

        $.map(this.financeList, (item, index) => {
            if (tempUid !== item.uid) {
                tempUid = item.uid;
                list.push(item.uid);
            }
        });

        this.uidList = list;
    }

    changeUid() {
        this._setCurrentAsset();
        this.searchList();
    }

    changeAssetCode() {
        this.searchList();
    }

    /**
     * 根据uid和类型来获取对应的资产详情
     * @private
     */
    _setCurrentAsset() {
        let asset = _.find(this.financeList, (assetItem) => {
            return assetItem.uid == this.condition.uid && assetItem.assetCode === this.condition.assetCode;
        });
        this.currentAsset = asset;
    }


    checkSubmit(obj) {
        if (!obj.amount) {
            window.toast('金额不能为空');
            return false;
        }
        if (obj.amount && obj.amount <= 0) {
            window.toast('金额不能小于等于0')
            return false
        }
        // if (!/^-?[0-9]+(\.\d{0,2})?$/.test(obj.amount)) {
        //     window.toast('金额最多两位小数')
        //     return false
        // }
        if (!obj.password) {
            window.toast('密码不能为空');
            return false
        }
        return true
    }

    brokerDeposit(amount, password) {
        if(!this.condition.uid) {
            window.toast('请输入账户uid');
            return
        }
        let financeType = this.operationType1=='锁仓'?'LOCKING': this.operationType1=='限制可用'?'LOCKING_AVAILABLE':'AVAILABLE'
        if (!this.checkSubmit({amount: amount, password: password})) {
            return;
        }
        let params = {
            brokerId: this.brokerid,
            uid: this.condition.uid,
            assetCode: this.condition.assetCode,
            amount: amount,
            financeType: financeType
        };
        this.rmbManageSvc.brokerDeposit(params, {
            'login-password': password
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.moneyvaluein = '';
                this.passwordin = '';
                this.operationType1= '';
                this.operationType2= '';
                this.searchList();
            } else if (rep.code === window.CODE.LOGIN_PWD_ORIGIN.CODE) {
                window.toast('密码错误');
            } else {
                window.toast(rep.msg);
            }
        }, err => {
            console.log('err');
        });
    }


    brokerWithdraw(amount, password) {
        if(!this.condition.uid) {
            window.toast('请输入账户uid');
            return
        }
        let financeType = this.operationType2=='锁仓'?'LOCKING': this.operationType2=='限制可用'?'LOCKING_AVAILABLE':'AVAILABLE'
        if (!this.checkSubmit({amount: amount, password: password})) {
            return;
        }
        let params = {
            brokerId: this.brokerid,
            uid: this.condition.uid,
            assetCode: this.condition.assetCode,
            amount: amount,
            financeType: financeType
        };
        this.rmbManageSvc.brokerWithdraw(params, {
            'login-password': password
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.moneyvalueout = '';
                this.passwordout = '';
                this.operationType1= '';
                this.operationType2= '';
                this.searchList();
            } else if (rep.code === window.CODE.INSUFFICIENT_BALANCE.CODE) {
                window.toast(window.CODE.INSUFFICIENT_BALANCE.CH);
            } else if (rep.code === window.CODE.LOGIN_PWD_ORIGIN.CODE) {
                window.toast('密码错误');
            } else {
                window.toast(rep.msg);
            }
        }, err => {
            console.log('err');
        });
    }


}

export default RmbManageController;