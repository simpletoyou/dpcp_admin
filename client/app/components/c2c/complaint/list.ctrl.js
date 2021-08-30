import config from '../config';

import passwordDialog from '../passwordDialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, c2cSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = c2cSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.list = null;

        this.config = config;
        this.isLoading = false;

        this.complainType = ''; //SELL
        this.status = 'PROCESSING'; //'PROCESSING', 'PROCESSED'
        this.orderType = 'SELL';
        this.orderTypeHistory = 'SELL';
        this.condition = {
            uid: '',
            pageNo: 1,
            pageSize: 30
        };


        this.init();
    }

    init() {
        this.fetchComplaintList();
    }


    toggleTab(status, name) {
        if (status == 'SELL' || status == 'PURCHASE') {
            this.orderTypeHistory = status;
            this.orderType = status;
            this.status = 'PROCESSING';
        } else {
            this.orderTypeHistory = name + 'History';
            this.orderType = name;
            this.status = status;
        }
        this.fetchComplaintList();
    }

    fetchComplaintList() {
        let param = {
            pageNo: this.condition.pageNo,
            pageSize: this.condition.pageSize,
            complainType: this.complainType,
            status: this.status,
            c2cTransOrderType: this.orderType
        };
        this.service.c2cComplaintQuery(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
            } else {
                window.toast(rep.msg);
            }
        })
    }




    /**
     * 强制打币
     * @param complainId
     */
    transforForce(complainId) {
        let that = this;

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                complainId: complainId
            };
            window.toast('请稍候...');
            let name = that.orderType == 'SELL' ? 'c2cComplaintTransforForce' : 'c2cBuyTransferForce';
            that.service[name](param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast(rep.msg);
                    that.fetchComplaintList();

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
     * 强制关闭订单
     * @param complainId
     */
    closeForce(complainId) {
        let that = this;

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            let param = {
                complainId: complainId
            };
            window.toast('请稍候...');
            let name = that.orderType == 'SELL' ? 'c2cComplaintCloseForce' : 'c2cBuyCloseForce';
            that.service[name](param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
                    that.fetchComplaintList();
                    window.toast(rep.msg);
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


    pageChanged() {
        //带参数的查询
        this.fetchComplaintList();
    }

    //申诉单详情
    goDetail(id, type) {
        let name = type == 'SELL' ? 'SELL' : 'PURCHASE';
        this.$location.url('/c2c/complaint/detail?complainId=' + id + '&type=' + name);
    }


}


export default ListController;