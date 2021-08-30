
import config from '../config';

import passwordDialog from './passwordDialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, cashSvc, $uibModal,$location,$cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = cashSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        this.type = config.STATUS_CASH_IN_ALL.KEY;

        this.keyWord = config.TYPE_SCREEN_CASH_IN_ID.KEY;
        this.keyWordText = '';

        this.cashInCondition = {
            status: "",
            pageNo: 1,
            pageSize: config.PAGE_SIZE
        };
        this.init();
    }

    init() {
        this.fetchList();
    }

    changeKey() {
        this.keyWordText = '';
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, this.cashInCondition);
        if (this.keyWordText) {
            param[this.keyWord] = this.keyWordText;
            param.channelType = 'OKPAY';
        }
        this.service.depositCurrencyList(param).then(rep => {
            this.isLoading = false;
            if(rep.code === window.CODE.SUCCESS){
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.cashInCondition.pageSize;
            }else{
                window.toast(rep.msg);
            }
        })
    }

    //查看个人信息
    searchInfo(data){
        this.userid=data;
        this.$location.url('/commonusers/personalinfo?uid='+this.userid);
    }


    /**
     * 确认到账
     * @param id
     * @param password
     */
    confirmTransfer(id) {
        let that = this;

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.confirmDepositTransfer({
                id: id
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code===window.CODE.SUCCESS){
                    window.toast('确认中……', {
                        callback() {
                            window.toast(rep.msg);
                            that.cashInCondition.pageNo = 1;
                            that.fetchList();
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
}


export default ListController;
