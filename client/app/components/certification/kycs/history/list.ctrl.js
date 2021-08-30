/**
 * author zhaojing
 */
import passwordDialog from '../verify/passwordDialog.html';
var zhengjianBG = require('../verify/imgs/my.png');
import CONFIG from '../verify/config'

class ListController {
    constructor($rootScope, $scope, securitySvc, $uibModal, $location) {
        'ngInject';
        /**
         * 注入的服务
         */

        this.$uibModal = $uibModal;
        this.rootScope = $rootScope
        this.scope = $scope;
        this.$scope = $scope;
        this.service = securitySvc;
        this.$location = $location;

        this.list = null;
        this.isLoading = false;
        this.keyWord = 'idCard';
        this.keyWordVal = '';

        this.CONFIG = CONFIG;

    }

    $onInit() {
        this.init();
    }


    init() {

    }

    //标记为失效
    setDelFlag(id) {
        let that = this;
        let modalInstance = this.$uibModal.open({
            animation: false,
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
                id: id
            }
            let header = {
                'login-password': password
            }
            that.service.auditUserIdentifyLimit(param, header).then(data => {
                if (data.code == window.CODE.SUCCESS) {
                    that.fetchList();
                } else {
                    window.toast(data.msg)
                }
            })
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };

    }

    //认证理由提示
    textReturn(id) {
        for (let i of this.CONFIG.FAIL_REASON) {
            if (id == i.ID) {
                return i.CN;
            }
        }
    }

    /**
     * 获取列表
     */
    fetchList() {
        if (!this.keyWordVal) {
            window.toast('请输入搜索数据');
            return false;
        }
        this.isLoading = true;
        let param = {};
        if (this.keyWord == 'uid') {
            param.uid = this.keyWordVal
        } else {
            param.idCard = this.keyWordVal
        }
        this.service.userIdentificationHistory(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.identificationDtos;
            } else {
                window.toast(rep.msg);
            }
        })
    }

}

export default ListController;