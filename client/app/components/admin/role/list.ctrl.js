

class ListController {
    constructor($scope, accountSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = accountSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.boundGoogle = window.localStorage.getItem('bound-google');


        this.secretcode = '';
        this.googleAuthenticator = '';

        this.googleCode = ''


        this.init();
    }

    init() {
        this.fetchGoogleAuthData();
    }


    /**
     * 获取google认证数据
     * */
    fetchGoogleAuthData(){

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
        this.service.firstCheckGoogleCode({},{'google-code':this.googleCode}).then(rep=>{
            if(rep.code === window.CODE.SUCCESS){

                window.toast('绑定成功！');
            }
        })
    }





}


export default ListController;
