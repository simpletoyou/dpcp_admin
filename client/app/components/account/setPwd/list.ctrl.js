import passwordDialog from '../passwordDialog.html';



class ListController {
    constructor($scope, adminSvc,commonSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = adminSvc;
        this.commonSvc = commonSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.oldPwd = '';
        this.newPwd = '';
        this.confirmPwd = '';

        this.newPwdErrTip = '';


        this.init();
    }

    init() {

    }


    /**
     * 修改密码
     * */

    changePassword(){
        if(this.newPwd === '123456'){//前端写死：重置密码默认值为123456
            this.newPwdErrTip = '新密码不能与初始化密码一致';
            return;
        }
        let that = this;
        let header = {
            'login-password': this.oldPwd
        };

        this.service.setLoginPassword({
            'login-password': this.newPwd
        }, header).then(rep => {
            if(rep.code===window.CODE.SUCCESS){
                window.toast('密码修改成功',{
                    callback(){
                        //两项安全信息均设置完成，则跳出重新登录
                        let header = {
                            'account-no':this.accountNo
                        };
                        that.commonSvc
                            .logout({},header)
                            .then(data => {
                                window.localStorage.removeItem('account-no');
                                window.localStorage.removeItem('bound-google');
                                window.localStorage.removeItem('set-pwd-flag');
                                window.location.href = 'login.html';
                            });
                    }
                });
            }else{
                window.toast(rep.msg);
            }
        })

    }

}


export default ListController;
