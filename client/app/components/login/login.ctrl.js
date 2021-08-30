/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:36
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-30 10:57:40
 */
/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/16
 */

export default class {
    /**
     * @param $scope
     */
    constructor($scope, loginSvc, $cookies) {
        "ngInject";
        this.$scope = $scope;
        this.$scope.account = '';
        this.$scope.password = '';
        this.$scope.googleCode = '';
        this.service = loginSvc;
        this.$cookies = $cookies;
        this.init();
    }

    init() {
        this.$scope.$watch('form.account', (newValue, oldValue) => {
            if ($.trim(newValue) !== '') {
                if (/\d+/.test(newValue) === false) {
                    this.$scope.form.account = oldValue;
                }
            }
        });
    }

    login() {
        if ($.trim(this.$scope.account) === '') {
            window.toast('请输入您的手机号');
            return;
        }
        if ($.trim(this.$scope.password) === '') {
            window.toast('请输入登录密码');
            return;
        }

        let param = {
            account :this.$scope.account
        };
        let header = {
            'login-password':this.$scope.password,
            'account-no':this.$scope.account,
            'google-code':this.$scope.googleCode
        };
        this.service.login(param,header).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.$cookies.put('role', rep.data.role);
                this.$cookies.put('LOGIN_TOKEN_ADMIN', rep.data.token);

                //谷歌绑定、重置密码信息
                window.localStorage.setItem('bound-google',rep.data.boundGoogle);
                window.localStorage.setItem('set-pwd-flag',rep.data.setPwdFlag);
                window.localStorage.setItem('account-no',this.$scope.account);
                //根据不同角色权限 跳转不同的默认功能
                if(rep.data.role === 'ADMIN'){
                    window.location.href = "./index.html#/admin/user";
                }else{
                    if(!rep.data.boundGoogle ){
                        window.location.href = "./index.html#/account/google";
                    }else{
                        if(!rep.data.setPwdFlag){
                            window.location.href = "./index.html#/account/set-pwd";
                        }else{
                            window.location.href = "./index.html#/admin/user";
                        }
                    }
                }



            } else {
                window.toast(rep.msg);
            }
        });
    }

}

