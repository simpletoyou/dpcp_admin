import config from '../../config';

import passwordDialog from '../../passwordDialog.html';

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

        this.config = config;
        this.isLoading = false;
        this.complainId = this.$location.search().complainId;
        this.c2cTransOrderType = this.$location.search().type;
        this.detail = {};


        this.init();
    }

    init() {
        this.fetchComplaintDetail();
    }



    /**
     * 查询申诉详情
     */
    fetchComplaintDetail() {
        let param = {
            complainId: this.complainId,
            c2cTransOrderType: this.c2cTransOrderType
        };
        this.service.c2cComplaintDetail(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.detail = rep.data;
                this.capture = JSON.parse(this.detail.capture);
            } else {
                window.toast(rep.msg);
            }
        });
    }

    //
    // /**
    //  * 强制打币
    //  * */
    //
    // transforForce(){
    //     let param = {};
    //
    //     this.service.c2cComplaintTransforForce(param).then(rep=>{
    //         if(rep.code === window.CODE.SUCCESS){
    //
    //         }else{
    //             window.toast(rep.msg);
    //         }
    //     })
    // }
    //
    //
    //
    //
    //
    // /**
    //  * 强制关闭
    //  * */
    // closeForce(){
    //     let param = {};
    //
    //     this.service.c2cComplaintCloseForce(param).then(rep=>{
    //         if(rep.code === window.CODE.SUCCESS){
    //
    //         }else{
    //             window.toast(rep.msg);
    //         }
    //     })
    // }


    /**
     * 强制打币
     * @param complainId
     */
    transforForce() {
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
                complainId: that.complainId
            };
            window.toast('请稍候...');
            that.service.c2cComplaintTransforForce(param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
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



    /**
     * 强制打币
     * @param complainId
     */
    closeForce() {
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
                complainId: that.complainId
            };
            window.toast('请稍候...');
            that.service.c2cComplaintCloseForce(param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === window.CODE.SUCCESS) {
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

}


export default ListController;