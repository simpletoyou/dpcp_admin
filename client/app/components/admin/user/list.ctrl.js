import passwordDialog from '../passwordDialog.html';


class ListController {
    constructor($scope, adminSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = adminSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.list = null;

        this.lockStatus = 'UNLOCK';//默认显示可用账户
        this.condition = {
            pageNo:1,
            pageSize:10
        };

        //以前开发的角色回显容错
        this.roleNameDic = {
            'ADMIN':'管理员',
            'CUSTOM_SERVICE':'客服',
            'ACCOUNTANT':'会计',
        }
        this.init();
    }

    //返回角色
    returnRole(role){
        // console.log(role)
        // console.log(role)
        return this.roleNameDic[role] || role
    }

    init() {
        this._fetchList();
    }





    /**
     * 获取列表
     */
    _fetchList() {
        this.isLoading = true;

        let param = Object.assign({
            lockStatus :this.lockStatus
        }, this.condition);

        this.service.adminList(param).then(rep => {
            if(rep.code === window.CODE.SUCCESS){
                this.isLoading = false;
                this.list = rep.data.list;
                this.totalNum = rep.data.total;
            }else{
                window.toast(rep.msg);
            }

        });
    }

    changeStatus(){
        this.condition.pageNo = 1;
        this._fetchList();
    }

    /**
     * 锁定管理员用户
     * */
    lock(uid){
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.lockAdmin({
                uid:uid
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code===window.CODE.SUCCESS){
                    window.toast("账户锁定成功",{
                        callback(){
                            that.lockUid = '';
                            that._fetchList();
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

    /**
     * 解锁管理员用户
     * */
    unlock(uid){
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.unlockAdmin({
                uid:uid
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code===window.CODE.SUCCESS){
                    window.toast("账户解锁成功",{
                        callback(){
                            that.unlockUid = '';
                            that._fetchList();
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


    /**
     * 获取登录信息
     * */
    fetchLoginInfo(uid){
        this.$location.url('/admin/user/login-log?uid='+uid)

    }

    /**
     * 重置登录密码
     * */
    resetPassword(uid){
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.resetLoginPassword({
                adminId:uid,
                loginPassword:'123456'
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code===window.CODE.SUCCESS){
                    window.toast("重置登录密码成功",{
                        callback(){
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



    /**
     * 重置谷歌验证码
     * */
    resetGoogleAuth(uid){
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            that.service.resetGoogleCode({
                adminId:uid
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code===window.CODE.SUCCESS){
                    window.toast("重置谷歌验证成功",{
                        callback(){
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
