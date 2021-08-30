const config = {
    PAGE_SIZE: 10,
}
import passwordDialog from '../../c2c/passwordDialog.html'
class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, c2cAgentSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = c2cAgentSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;
        this.$scope.statusList = [{
                value: 'INITING',
                label: '申请中'
            },
            {
                value: 'VALID',
                label: '申请成功'
            },
            {
                value: 'INVALID',
                label: '申请失败'
            }
        ]
        this.condition = {
            pageNo: 1,
            pageSize: config.PAGE_SIZE,
            status: this.$scope.statusList[0].value
        };
        this.init();
    }

    init() {
        this.getUserInfo();
    }

    //查询c2c会员申请信息
    getUserInfo() {
        let param = Object.assign({}, this.condition);
        this.service.userApplyMemberInfo(param).then(data => {
            if (data.code == window.CODE.SUCCESS) {
                this.list = data.data.list;
                this.totalNum = data.data.pageNum * this.pageSize;
            } else {
                window.toast(data.msg);
            }
        })
    }

    //通过还是拒绝
    updata(item, type) {
        let param = {};

        if (type != 'EVER') {
            param = {
                uid: item.uid,
                status: type
            };
        } else {
            param = {
                id: item.id
            }
        }
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
            let header = {
                'login-password': password
            };

            let name = type == 'EVER' ? 'removeMembe' : 'updataUserApplyMembe';
            that.service[name](param, header).then(data => {
                if (data.code == window.CODE.SUCCESS) {
                    that.getUserInfo()
                } else {
                    window.toast(data.msg);
                }
            })
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }
}


export default ListController;