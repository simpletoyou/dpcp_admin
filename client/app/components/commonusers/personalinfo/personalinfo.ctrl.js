/**
 * author liubingli
 */
import passwordDialog from './passwordDialog.html'
import assetsDialog from './assetDialog.html'
import googleAuthDialog from '../../../components/admin/passwordDialog.html';
var zhengjianBG = require('./imgs/my.png');
//构造函数，构造拖拽对象
function DragObj(id) {
    var self = this;
    this.box = document.getElementById(id);
    //==添加方法
    this.startMove = function (x, y) {
        this.disX = x - document.getElementById('imgMovs').offsetLeft;
        this.disY = y - document.getElementById('imgMovs').offsetTop;
        //移动事件
        document.onmousemove = function (evt) {
            var oEvent = evt || event;

            self.moving(oEvent.clientX, oEvent.clientY);
        }
        //松开事件
        document.onmouseup = function () {

            self.stopMove();
        }
    }
    this.moving = function (x, y) {
        document.getElementById('imgMovs').style.left = x - this.disX + "px";
        document.getElementById('imgMovs').style.top = y - this.disY + "px";
    }
    this.stopMove = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    }
    //给box添加鼠标按下事件
    this.box.onmousedown = function (evt) {
        var oEvent = evt || event;
        self.startMove(oEvent.clientX, oEvent.clientY);
    }
}
class PersonalinfoController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object} 此controller的私有接口
     * @param  {Object} 枚举类型接口
     * @param  {Object} 公共接口
     * @return {Object}
     */
    constructor($scope, basicInfoSVC, tradeControlSvc, enumSvc, rmbManageSvc, coinSvc, commonSvc, commonusersSvc, $location, $uibModal) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.$scope = $scope;
        this.basicInfoSvc = basicInfoSVC;
        this.enumSvc = enumSvc;
        this.coinSvc = coinSvc;
        this.tradeControlSvc = tradeControlSvc;
        this.rmbManageSvc = rmbManageSvc;
        this.commonSvc = commonSvc;
        this.$location = $location;
        this.$uibModal = $uibModal;
        this.commonusersSvc = commonusersSvc;
        this.zhengjianBG = zhengjianBG;
        this.iepNum = '';

        // 资产列表，分三列展示
        this.assets = [
            [],
            [],
            []
        ]

        // 邮箱 uid 查询
        this.uid = this.$location.search().uid;
        this.email = this.$location.search().account;
        this.data = {};
        this.imgDialogIsShow = false;
        this.imgDialogSrc = '';

        this.list = [];
        this.pageNo = 1;
        this.pageSize = 10;
        this.totalNum = 0;
        this.type = 'deposi';
        this.item = {};
        this.coin = 'UDC';


        this.init();
    }

    init() {
        this.queryUserInfo();
    }

    setType(name) {
        this.type = name;
        if (this.type == 'deposi') {
            this.depositList();
        } else if (this.type == 'withdraw') {
            this.withdrawList();
        } else if (this.type == 'c2cBuy' || this.type == 'c2cSell') {
            this.c2cList()
        } else {
            this.searchList();
        }
    }

    statusFun(item) {
        switch (item) {
            case "FINISHED":
                return "交易完成";
                break;
            case "CANCELED":
                return "交易取消";
                break;
            case "CLOSED":
                return "交易关闭";
                break;
            case "OVERTIME":
                return "交易超时";
                break;
            case "PAID":
                return "已支付";
                break;
            case "UNPAY":
                return "未支付";
                break;
            case "COMPLAINNING":
                return "申诉中";
                break;
            default:
                break;
        }
    }

    c2cList() {
        this.isLoadings = true;
        let param = {
            assetCode: this.coin,
            status: '',
            pageNo: this.pageNo,
            pageSize: this.pageSize
        }
        if (this.type == 'c2cBuy') {
            param.buyUid = this.$location.search().uid
        } else {
            param.sellUid = this.$location.search().uid
        }
        this.tradeControlSvc.transInfo(param).then(rep => {
            this.isLoadings = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }


    pageChanged() {
        //带参数的查询
        if (this.type == 'deposi') {
            this.depositList();
        } else if (this.type == 'withdraw') {
            this.withdrawList();
        } else if (this.type == 'c2cBuy' || this.type == 'c2cSell') {
            this.c2cList()
        } else {
            this.searchList();
        }
    }

    searchList() {
        this.isLoadings = true;
        let params = {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            assetCode: this.item.assetCode,
            uid: this.$location.search().uid
        };
        this.rmbManageSvc.listInfo(params).then((rep) => {
            this.isLoadings = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.pageSize;
            }
        })
    }

    withdrawList() {
        this.isLoadings = true;
        this.coinSvc.getProcessedCoinWithdrawList({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            assetCode: this.item.assetCode,
            status: 'PROCESSED',
            uId: this.$location.search().uid
        }).then(rep => {
            this.isLoadings = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    depositList() {
        this.isLoadings = true;
        this.coinSvc.getCoinDepositList({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            assetCode: this.item.assetCode,
            status: '',
            uId: this.$location.search().uid
        }).then(rep => {
            this.isLoadings = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    showAssetsDialog(item) {
        this.type = 'deposi';
        let that = this;
        this.item = item;
        this.depositList();
        let modalInstance = this.$uibModal.open({
            template: assetsDialog,
            scope: this.$scope,
            size: '900',
            controller() {}
        });


        this.$scope.$$ok = function () {

            // that.service.coinConfirm(confirmParam, {
            //     'login-password': password
            // }).then(rep => {
            //     if (rep.code === window.CODE.SUCCESS) {
            //         window.toast('操作中……', {
            //             callback() {
            //                 window.toast(rep.msg);
            //                 that.fetchList();
            //                 that.$scope.$root.updateMenuUnverifyNum();
            //             }
            //         });
            //     } else {
            //         window.toast(rep.msg);
            //     }
            // });
            // modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }

    queryUserInfo() {
        let that = this;
        let param = {
            type: this.uid ? 'UID' : this.email ? 'EMAIL' : '',
            value: this.uid || this.email
        };
        this.commonusersSvc.personAssets({
            uid: this.uid
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                let num = Math.ceil(rep.data.length / 3);
                this.assets = [rep.data.slice(0, num), rep.data.slice(num, num * 2), rep.data.slice(num * 2, num * 3)]
            } else {
                this.assets = [
                    [],
                    [],
                    []
                ]
            }
        })
        this.commonusersSvc.personDetailsInfo(param).then(rep => {
            this.isLoading = false;

            if (rep.code === window.CODE.SUCCESS) {
                // console.log(JSON.parse(rep.data));
                that.data = rep.data;

                // 照片  只取第一张
                that.data.userIdentification.cardBack = rep.data.userIdentification.cardPhoto ? this.formatJsonParse(rep.data.userIdentification.cardPhoto)[1] : '';
                that.data.userIdentification.cardPhoto = rep.data.userIdentification.cardPhoto ? this.formatJsonParse(rep.data.userIdentification.cardPhoto)[0] : '';
                that.data.userIdentification.cardHandhold = rep.data.userIdentification.cardHandhold ? this.formatJsonParse(rep.data.userIdentification.cardHandhold)[0] : '';
                if (rep.data.userResidence.residencePhoto && rep.data.userResidence.residencePhoto.length) {
                    that.data.userIdentification.residencePhoto = JSON.parse(rep.data.userResidence.residencePhoto)[0];
                }
                // that.data.userResidence.residencePhoto = [rep.data.userIdentification.cardHandhold];
                // that.data.userResidence.residencePhoto = (rep.data.userResidence.residencePhoto != null) ? this.formatJsonParse(rep.data.userResidence.residencePhoto) : [];
                this.$scope.$$disabledTrad = that.data.userFreezing.transactionStatus == null ? false : that.data.userFreezing.transactionStatus == 0 ? false : true
                this.$scope.$$disabledWithdraw = that.data.userFreezing.putforwardStatus == null ? false : that.data.userFreezing.putforwardStatus == 0 ? false : true
                this.$scope.$$disabledLogin = that.data.userFreezing.loingStatus == null ? false : that.data.userFreezing.loingStatus == 0 ? false : true
            } else {
                setTimeout(() => {
                    window.history.back()
                }, 1000)
                window.toast(rep.msg);
            }
        })
    }

    // changeType(type) {
    //     this.transferType = type;

    // }

    //矿机赠送IEP
    giftFinanceIEP() {
        if (!this.iepNum) {
            window.toast('请输入赠送的数量');
            return false;
        }
        if (!Number(this.iepNum + '') || this.iepNum < 0.01) {
            window.toast('请输入正确的数量');
            return false;
        }
        let param = {
            amount: this.iepNum,
            uid: this.uid
        };
        let that = this;
        window.confirm('是否确认赠送' + this.iepNum + '个IEP', function () {
            that.basicInfoSvc.giftFinanceIEP(param).then(data => {
                if (data.code == window.CODE.SUCCESS) {
                    window.toast('赠送成功');
                    that.iepNum = '';
                    that.queryUserInfo();
                } else {
                    window.toast(data.msg);
                }
            })
        }, function () {
            // console.log(2)取消按钮
        })

    }

    //设置全部提现冻结或者解除
    updateByStatus(param, password, modalInstance) {
        this.isLoading = true;
        this.basicInfoSvc.updateByStatus(param, {
            'login-password': password
        }).then(data => {
            if (data.code == window.CODE.SUCCESS) {
                window.toast(data.msg)
                this.queryUserInfo()
                modalInstance.dismiss('ok');
            } else {
                window.toast(data.msg)
            }
        })
    }

    //冻结或者开放某个币种
    createUpCurrencyFreezing(obj, name) {
        // Integer uid, String assetCode, Integer transactionStatus, Integer putforwardStatus
        let param = {
            uid: this.uid,
            assetCode: obj.assetCode
        }
        if (name == 'transactionStatus') {
            param.transactionStatus = obj.transactionStatus == 0 ? 1 : 0
        }
        if (name == 'putforwardStatus') {
            param.putforwardStatus = obj.putforwardStatus == 0 ? 1 : 0
        }
        this.isLoading = true;
        this.basicInfoSvc.createUpCurrencyFreezing(param).then(data => {
            this.isLoading = false;
            if (data.code == window.CODE.SUCCESS) {
                window.toast(data.msg)
                this.queryUserInfo()
            } else {
                window.toast(data.msg)
            }
        })
    }



    showDialog() {
        let that = this;
        console.log(this.$scope.$$disabledTrad, this.$scope.$$disabledWithdraw)
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });


        this.$scope.$$ok = function (password, disabledLogin, disabledTrad, disabledWithdraw, textarea) {
            if (!textarea) {
                window.toast('请输入操作原因');
                return false
            }
            let param = {
                uid: that.uid,
                causeFreezing: textarea,
                transactionStatus: disabledTrad == false ? 0 : 1,
                putforwardStatus: disabledWithdraw == false ? 0 : 1,
                loingStatus: disabledLogin == false ? 0 : 1
            }
            that.updateByStatus(param, password, modalInstance)
            // that.service.coinConfirm(confirmParam, {
            //     'login-password': password
            // }).then(rep => {
            //     if (rep.code === window.CODE.SUCCESS) {
            //         window.toast('操作中……', {
            //             callback() {
            //                 window.toast(rep.msg);
            //                 that.fetchList();
            //                 that.$scope.$root.updateMenuUnverifyNum();
            //             }
            //         });
            //     } else {
            //         window.toast(rep.msg);
            //     }
            // });
            // modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }

    //打开重置谷歌验证页面
    openGoogleAuth() {
        let that = this
        let modalInstance = this.$uibModal.open({
            template: googleAuthDialog,
            scope: this.$scope,
            controller() {}
        });
        this.$scope.$$ok = function (password) {
            console.log(password)
            console.log(that.uid)
            let json = {
                uid: that.uid
            }
            that.commonusersSvc.userDetailGoogleReset(json, {
                'login-password': password
            }).then(res => {
                console.log('用户详情重置谷歌验证')
                console.log(res)
                if (res.code === window.CODE.SUCCESS) {

                } else {
                    window.toast(res.msg);
                }
            })
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }

    showImg(type, subType) {
        // 初级认证
        if (arguments.length == 2) {
            if (this.data[type][subType].toUpperCase().indexOf('PDF') < 0) {
                this.imgDialogSrc = '/exchange_manager/common/photo?name=' + this.data[type][subType] || '';
                this.imgDialogIsShow = true;
            } else if (this.data[type][subType].toUpperCase().indexOf('PDF') >= 0) {
                window.location.href = '/exchange_manager/common/photo?name=' + this.data[type][subType]
            }
        } else {
            this.imgDialogSrc = '/exchange_manager/common/photo?name=' + type || '';
            this.imgDialogIsShow = true;
        }
        setTimeout(() => {
            new DragObj('imgMov');
        }, 100)


    }
    closeImg() {
        this.imgDialogIsShow = false;
        this.imgDialogSrc = '';
    }
    formatJsonParse(photoStr) {
        return JSON.parse(photoStr);
    }

}





















export default PersonalinfoController;