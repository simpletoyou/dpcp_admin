/**
 * author zhaojing
 */
import addManualBill from '../components/addManualBill.html';
import dealMismatch from '../components/dealMismatch.html';
import dealBad from '../components/dealBad.html';
import pwdDialog from '../components/passwordDialog.html'
class ListController {

    constructor($scope, $uibModal,financeCheckSvc, commonSvc,$cookies) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.service = financeCheckSvc;
        this.commonSvc = commonSvc;
        this.$cookies = $cookies;
        this.uid = this.$cookies.get('uid');

        this.list = null;
        this.isLoading = false;
        this.totalNum = 0;
        this.$scope.$$dealMismatch = {
            changeType:'',
            assetType:'',
            amount:'',
            remark:'',
            password:''
        };
        this.$scope.$$addManualBill = {
            txNo:'',
            uid:'',
            pwd:'',
            remark:'',
            amount:'',
            serNum:'',
            payAccount:'',
            recvAccount:''
        };
        this.$scope.$$dealBad = {
            txNo:'',
            uid:'',
            pwd:'',
            remark:'',
            amount:''
        };
        this.$scope.$$doRematch = {

        }

        this.condition = {
            "pageNo": 1,
            "pageSize": 10,
            "status": "INIT",
            "assetType": ""
        };
        this.$scope.clearNoNum = function (obj,attr) {
            if(obj&&obj[attr]){
                //先把非数字的都替换掉，除了数字和.
                obj[attr] = obj[attr].replace(/[^\d.]/g,"");
                //必须保证第一个为数字而不是.
                obj[attr] = obj[attr].replace(/^\./g,"");
                //保证只有出现一个.而没有多个.
                obj[attr] = obj[attr].replace(/\.{2,}/g,"");
                //保证.只出现一次，而不能出现两次以上
                obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                //obj[attr] = obj[attr].match(/^[1-9]+[0-9]*(\.\d{0,4})?$/)?obj[attr]:'';
            }
        }
        this.init();

    }

    /**
     * @return {null}
     */
    init() {
        this.fetchList();
    }


    /**
     * 获取列表
     */
    fetchList() {
        let param = Object.assign({}, this.condition);
        this.isLoading = true;
        this.service.checkMismatchList(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.totalNum = rep.data.totalNum;
                this.list = rep.data.list;//rep.data.list;//
                if (this.list != null && this.list.length > 0) {
                    this.list.forEach((item)=>{
                        item.showDetail = false;
                        item.assetTypeText = this.formatAssetType(item.assetType);
                        item.optTypeText = this.formatOptType(item.optType);
                        item.mismtach = this.formatMismtachType(item);
                    })
                }else{
                    this.list = [];
                }
            } else {
                this.list = [];
                window.toast(rep.msg);
            }
        })
    }


    /**
     * 打开人工添加账单对话框
     * @param item
     */
    openManualBill(item, type) {
        let that = this;
        this.$scope.$$type = type;
        this.$scope.$$addManualBill.item = item;
        let modalInstance = this.$uibModal.open({
            animation: false,
            template: addManualBill,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$addManualBill.ok = function (addManualBill) {
            if (addManualBill.password === '') {
                window.toast('请输入当前账号密码');
                return;
            }

            let param = {
                txNo:item.txNo,//差错流水号
                uid:that.uid,//操作员id
                pwd:addManualBill.password,//psw,操作员密码
                remark:addManualBill.remark,//备注
                amount:addManualBill.amount,//金额
                serNum:addManualBill.serNum,
                payAccount:addManualBill.payAccount,
                recvAccount:addManualBill.recvAccount
            }
            //人工打款
            if(type==='manualAdd'){
                that.service.manualPlay(param).then(rep => {
                    doSuccess(rep);
                });
            }else{
                //人工退款
                that.service.manualRefund(param).then(rep => {
                    doSuccess(rep);
                });
            }
        };

        this.$scope.$$addManualBill.cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            /*this.$scope.$$addManualBill = {
                txNo:'',
                uid:'',
                pwd:'',
                remark:'',
                amount:'',
                serNum:'',
                payAccount:'',
                recvAccount:''
            };*/
            this.$scope.$$addManualBill.txNo = '';
            this.$scope.$$addManualBill.uid = '';
            this.$scope.$$addManualBill.pwd = '';
            this.$scope.$$addManualBill.remark = '';
            this.$scope.$$addManualBill.amount = '';
            this.$scope.$$addManualBill.serNum = '';
            this.$scope.$$addManualBill.payAccount = '';
            this.$scope.$$addManualBill.recvAccount = '';
        });

        function doSuccess(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                modalInstance.dismiss('ok');
                window.toast('添加人工账单处理成功！',{
                    callback() {
                        that.fetchList();
                    }
                });
            } else {
                let msg = rep.msg;
                if(rep.msg=='PASSWORD_ERROR'){
                    msg = '密码错误'
                }
                window.toast(msg);
            }

        }
    }



    /**
     * 打开差错处理单
     * @param item
     */
    openDealMismatch(item, type) {
        this.$scope.$$type = type;//操作类型
        this.$scope.$$dealMismatch.item = item;
        this.$scope.$$dealMismatch.assetType = item.assetType;
        this.$scope.$$dealMismatch.changeType = item.mismtach.changeType;
        this.$scope.$$dealMismatch.amount = item.mismtach.amount;
        let that = this;
        let modalInstance = this.$uibModal.open({
            animation: false,
            template: dealMismatch,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$dealMismatch.ok = function (dealMismatch) {
            if (dealMismatch.password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            that.service.rebalanceAsset({
                txNo:item.txNo,//差错流水号
                uid:that.uid,//操作员id
                pwd:dealMismatch.password,//psw,操作员密码
                changeType:dealMismatch.changeType,//变更类型ADD/REDUCE
                remark:dealMismatch.remark,//备注
                amount:dealMismatch.amount//金额
            }).then(rep => {
                doSuccess(rep);
            });
        };

        this.$scope.$$dealMismatch.cancel = function () {
            modalInstance.dismiss('cancel');
        };




        modalInstance.opened.then(() => {
           /* this.$scope.$$dealMismatch = {
                changeType:'ADD',
                assetType:'CNY',
                amount:'',
                remark:'',
                password:''
            };*/
            this.$scope.$$dealMismatch.remark = '';
            this.$scope.$$dealMismatch.password = '';
            this.$scope.$$dealMismatch.assetType = item.assetType;
            this.$scope.$$dealMismatch.changeType = item.mismtach.changeType;
            this.$scope.$$dealMismatch.amount = Number(item.mismtach.amount);
        });

        function doSuccess(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                modalInstance.dismiss('ok');
                window.toast('差错处理成功！',{
                    callback() {
                        that.fetchList();
                    }
                });
            } else {
                let msg = rep.msg;
                if(rep.msg=='PASSWORD_ERROR'){
                    msg = '密码错误'
                }
                window.toast(msg);
            }
        }
    }



    /**
     * 打开坏账处理单
     * @param item
     */
    openDealBad(item, type) {
        this.$scope.$$type = type;
        this.$scope.$$dealBad.item = item;
        this.$scope.$$dealBad.assetType = item.assetType;
        this.$scope.$$dealBad.changeType = item.mismtach.changeType;
        this.$scope.$$dealBad.amount = item.mismtach.amount;
        let that = this;
        let modalInstance = this.$uibModal.open({
            animation: false,
            template: dealBad,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$dealBad.ok = function (dealBad) {
            if (dealBad.password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            that.service.recordBadFinance({
                txNo:item.txNo,//差错流水号
                uid:that.uid,//操作员id
                pwd:dealBad.password,//psw,操作员密码
                remark:dealBad.remark,//备注
                amount:dealBad.amount,//金额
                // changeType:dealBad.changeType//操作类型
            }).then(rep => {
                doSuccess(rep);
            });
        };

        this.$scope.$$dealBad.cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            /*this.$scope.$$dealBad = {
                txNo:'',
                uid:'',
                pwd:'',
                remark:'',
                amount:''
            };*/
            // this.$scope.$$dealBad.txNo = '';
            // this.$scope.$$dealBad.uid = '';
            this.$scope.$$dealBad.pwd = '';
            this.$scope.$$dealBad.remark = '';
            this.$scope.$$dealBad.assetType = item.assetType;
            this.$scope.$$dealBad.changeType = item.mismtach.changeType;
            this.$scope.$$dealBad.amount = Number(item.mismtach.amount);
        });

        function doSuccess(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                modalInstance.dismiss('ok');
                window.toast('坏账处理成功！',{
                    callback() {
                        that.fetchList();
                    }
                })
            } else {
                let msg = rep.msg;
                if(rep.msg=='PASSWORD_ERROR'){
                    msg = '密码错误'
                }
                window.toast(msg);
            }
        }
    }


    /**
     * 重新匹配操作
     * */
    doRematch(item){
        let that = this;
        let modalInstance = this.$uibModal.open({
            animation: false,
            template: pwdDialog,
            scope: this.$scope,
            controller() {
            }
        });


        this.$scope.$$doRematch.ok = function (value) {
            if (value === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            that.service.rematch({
                txNo:item.txNo,//差错流水号
                uid:that.uid,//操作员id
                pwd:value,//psw,操作员密码
                transferType:item.optType,//??类型IN/OUT
                assetType:item.assetType,//??资产类型
                accountType:item.accountType//账户类型
            }).then(rep => {
                doSuccess(rep);
            });
        };

        this.$scope.$$doRematch.cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            this.$scope.$$password = '';
        });

        function doSuccess(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                if(rep.data.match_result==true){
                    modalInstance.dismiss('ok');
                    window.toast('重新匹配成功！',{
                        callback() {
                            that.fetchList();
                        }
                    })
                }else{
                    window.toast('重新匹配失败');
                }
            } else {
                let msg = rep.msg;
                if(rep.msg=='PASSWORD_ERROR'){
                    msg = '密码错误'
                }
                window.toast(msg);
            }
        }
    }















    //格式化资产类型：人民币、果仁
    formatAssetType(val){
        let assetType = {};
        switch (val) {
            case 'CNY':
                assetType.name = '人民币';
                assetType.unit = '￥'
                break;
            case 'GOP':
                assetType.name = '果仁';
                assetType.unit = 'G'
                break;
            default:
                assetType.name = val;
                assetType.unit = ''
        }
        return assetType;
    }

    //格式化操作类型：充值、转出
    formatOptType(val){
        let name = '';
        switch (val) {
            case 'IN':
                name = '充值';
                break;
            case 'OUT':
                name = '转出';
                break;
            default:
                name = val;
        }
        return name;
    }

    //格式化差错类型：多账、短账、状态不一致  依据moreAmount和lessAmount判断
    //格式化不同差错类型可执行的操作：重新匹配、差错处理、人工打款、坏账处理
    formatMismtachType(item){
        let mismtach={};
        if(item.moreAmount>0&&item.lessAmount==0){
            mismtach.name='多账';
            mismtach.val='+'+item.moreAmount.toFixed(2)+item.assetTypeText.unit;
            mismtach.amount=item.moreAmount.toFixed(2);
            mismtach.changeType = 'REDUCE'
        }else if(item.moreAmount==0&&item.lessAmount>0){
            mismtach.name='短账';
            mismtach.val='-'+item.lessAmount.toFixed(2)+item.assetTypeText.unit;
            mismtach.amount=item.lessAmount.toFixed(2);
            mismtach.changeType='ADD'
        }else if(item.moreAmount==0&&item.lessAmount==0){
            mismtach.name='状态不一致';
            mismtach.val=0.00+item.assetTypeText.unit   ;
            mismtach.amount=0.00;
            mismtach.changeType = null;
        }
        return mismtach;
    }


    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    toggleDetail(item) {
        item.showDetail = !item.showDetail;
    }


}

export default ListController;


