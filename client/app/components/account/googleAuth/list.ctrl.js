import passwordDialog from '../passwordDialog.html';



class ListController {
    constructor($scope, accountSvc,commonSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = accountSvc;
        this.commonSvc = commonSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.boundGoogle = false;


        this.secretcode = '';
        this.googleAuthenticator = '';
        this.googleCode = '';


        this.init();
    }

    init() {
        this.boundGoogle = window.localStorage.getItem('bound-google')==='true';
        this.fetchGoogleAuthData();
    }


    /**
     * 获取google认证数据
     * */
    fetchGoogleAuthData(){

        if(this.boundGoogle === true){
            return
        }
        this.service.getGoogleCode().then(rep=>{
            if(rep.code === window.CODE.SUCCESS){

                this.secretcode = rep.data.secretcode;
                this.googleAuthenticator = rep.data.googleAuthenticator;

                $('#googleCode').qrcode({
                    text:this.googleAuthenticator,
                    width: 150, //宽度
                    height:150, //高度
                });
            }
        })
    }

    /**
     * 绑定谷歌验证
     * */
    bindGoogleAuth(){
        let that = this;
        this.service.firstCheckGoogleCode({},{'google-code':this.googleCode}).then(rep=>{
            if(rep.code === window.CODE.SUCCESS){
                that.boundGoogle = true;
                window.localStorage.setItem('bound-google','true');

                window.toast('谷歌验证绑定成功！',{
                    callback(){
                        let setPwdFlag =  window.localStorage.getItem('set-pwd-flag');
                        if(setPwdFlag === 'true'){
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
                        }else{
                            //跳转修改密码页面
                            window.location.href='#/account/set-pwd';
                        }
                    }
                });
            }else{
                window.toast(rep.msg);
            }
        })
    }





}


export default ListController;
