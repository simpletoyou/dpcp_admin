import config from '../config';
import mathTool from '../../../common/mathTool';

import passwordDialog from '../passwordDialog.html';
import confirm from "../../confirm/confirm";


class ListController {
    constructor($scope, settingsSvc, tradeControlSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = settingsSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.config = config;

        // ================================ 白名单
        this.isWhiteListLoading = true;
        this.whiteList = [];
        this.condition = {
            uid: '',
            pageNo: 1,
            pageSize: 100
        };

        this.init();
    }

    init() {
        this._queryWhiteListconfig();

    }



    /** =================================================================================================================================== 白名单
     * 查询白名单
     * */
    _queryWhiteListconfig() {
        let that = this;
        let param = {
            pageNo: this.condition.pageNo,
            pageSize: this.condition.pageSize
        };

        this.isWhiteListLoading = true;
        this.service.queryWhiteListconfig(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.whiteList = rep.data.list;
            } else {
                window.toast(rep.msg);
            }
            this.isWhiteListLoading = false;
        })
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
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast('请稍候...', {
                        callback() {
                            window.toast(rep.msg);
                            that.condition.uid = '';
                            that._queryWhiteListconfig();
                        }
                    });
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
                if (rep.code === window.CODE.SUCCESS) {
                    window.toast('请稍候...', {
                        callback() {
                            window.toast(rep.msg);
                            that._queryWhiteListconfig();
                        }
                    });
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
