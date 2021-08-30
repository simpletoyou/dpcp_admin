/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/09
 */

import moment from 'moment';
import config from './list.config';
import confirm from '../../../components/confirm/confirm';
import rmb from '../../../common/filter/rmb';

import passwordDialog from './passwordDialog.html';

import CONFIG from '../config';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, cashSvc, $uibModal, $location) {
        "ngInject";

        this.$location = $location;

        this.service = cashSvc;

        this.$uibModal = $uibModal;

        this.$scope = $scope;
        this.$scope.list = null;
        this.$scope.moment = moment;
        this.$scope.CONFIG = CONFIG;
        this.$scope.isLoading = false;
        this.$scope.pageSize = CONFIG.PAGE_SIZE;

        // id, uid, name
        this.$scope.condition = {
            status: "",
            pageNo: 1,
            pageSize: CONFIG.PAGE_SIZE
        };

        this.$scope.imgs = {
            lock: require('./img/lock.png'),
            right: require('./img/right.png'),
            wrong: require('./img/wrong.png'),
            unlock: require('./img/unlock.png'),
            cancel: require('./img/cancel.png'),
            ok: require('./img/okpay.png')
        };
        
        this.$scope.type = 'id';
        this.$scope.keyword = '';
        this.$scope.totalNum = 0;

        this.$scope.$$password = '';
        this.$scope.$$type = CONFIG.TYPE_OPER_RIGHT;    // 操作类型

        this.init();
    }

    init() {
        this._fetchList();

        this.$scope.$watch('type', (newValue, oldValue) => {
            this.$scope.keyword = '';
        });

    }

    /**
     * 打开输入密码对话框
     * @param item
     */
    openPassDialog(item, type) {
        let that = this;
        this.$scope.$$type = type;
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

            switch (type) {
                case CONFIG.TYPE_OPER_RIGHT:
                    that.service.confirmWithdrawTransfer({
                        id: item.id
                    }, {
                        'login-password': value
                    }).then(rep => {
                        doSuccess(rep);
                    });
                    break;
                case CONFIG.TYPE_OPER_WRONG:
                    that.service.refundTransfer({
                        id: item.id
                    }, {
                        'login-password': value
                    }).then(rep => {
                        doSuccess(rep);
                    });
                    break;
                case CONFIG.TYPE_OPER_CANCEL:
                    that.service.cancelTransfer({
                        id: item.id
                    }, {
                        'login-password': value
                    }).then(rep => {
                        doSuccess(rep);
                    });
                    break;
                case CONFIG.TYPE_OPER_OKPAY:
                    that.service.pay({
                        payMode: 'OKPAY',
                        id: item.id
                    }, {
                        'login-password': value
                    }).then(rep => {
                        doSuccess(rep);
                    });
                    break;
                default:

            }


        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            this.$scope.$$password = '';
        });
        
        function doSuccess(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                modalInstance.dismiss('ok');
                that._fetchList();
            } else {
                window.toast(rep.msg);
            }
        }
    }
    
    detail(item) {
        this.$location.url(`/commonusers/personalinfo?uid=${item.uid}`);
    }

    pageChanged() {
        this._fetchList();
    }

    search() {
        this._fetchList();
    }

    lock(item) {
        let that = this;
        this.service.lockTransfer({
            id: item.id
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('锁定成功', {
                    callback() {
                        that._fetchList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    unlock(item) {
        let that = this;
        this.service.unlockTransfer({
            id: item.id
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('解锁成功', {
                    callback() {
                        that._fetchList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

    /**
     * 获取列表
     */
    _fetchList() {
        this.$scope.isLoading = true;

        let param = Object.assign({}, this.$scope.condition);
        if (this.$scope.keyword) {
            param[this.$scope.type] = this.$scope.keyword;
        }
        
        this.service.withdrawCurrencyList(param).then(rep => {
            this.$scope.isLoading = false;
            if(rep.code===window.CODE.SUCCESS){
                this.$scope.list = rep.data.list;
                this.$scope.totalNum = rep.data.pageNum * this.$scope.pageSize;
            }else{
                window.toast(rep.msg);
            }
        });
    }


}


export default ListController;
