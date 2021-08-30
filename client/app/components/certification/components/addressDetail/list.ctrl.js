/**
 * author zhaojing
 */
import pwdDialog from '../passwordDialog.html'
import CONFIG from './config'
class ListController {
    $onInit () {

    }

    constructor($rootScope,$scope, securitySvc, $location,$uibModal) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.rootScope = $rootScope;
        this.scope = $scope;
        this.service = securitySvc;
        this.$location = $location;
        this.$uibModal = $uibModal;

        this.isLoading = false;
        this.totalNum = 0;
        this.optionFlag = false;

        this.id = this.$location.search().id;
        this.opt = this.$location.search().opt;

        this.basicInfo = {};
        this.residenceInfo={};
        this.residenceHistory = [];

        this.audit = {
            auditStatus:'FAIL',
            auditMessageId:''
        };
        this.CONFIG = CONFIG;

        this.scope.imgs = {
            pdf: require('../pdf.png')
        };

        this.init();

    }

    /**
     * @return {null}
     */
    init() {
        this.fetchList();
        if(this.rootScope.optionFlag == true){
            this.optionFlag = true
        }
    }


    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        this.service.residenceAuthenticationItem({id:this.id}).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.basicInfo = rep.data.userBasicInfo;
                this.residenceInfo.city = rep.data.userResidence.city;
                this.residenceInfo.address = rep.data.userResidence.address;
                this.residenceInfo.postcode = rep.data.userResidence.postcode;
                this.residenceInfo.country = rep.data.userResidence.country;
                this.residenceInfo.residencePhoto = this.formatPhoto(rep.data.userResidence.residencePhoto);
                this.residenceInfo.residenceTranslate = this.formatPhoto(rep.data.userResidence.residenceTranslate);
                this.residenceHistory = _.filter(rep.data.userResidenceList, function(item) {
                    return item.auditStatus!=='INIT';
                });
                this.totalNum = rep.data.totalNum;

            } else {
                window.toast(rep.msg);
            }
        })
    }
    disableSelect(){
        document.querySelector('#auditMessage').disabled = true
    }

    enableSelect(){
        document.querySelector('#auditMessage').disabled = false
    }

    formatPhoto(photoStr){
        return JSON.parse(photoStr);
    }

    focusOnAuditMessage(){
        document.querySelector('#auditMessageTip').innerHTML=''
    }

    submit(){
        let param = {
            id:this.id,
            auditStatus:this.audit.auditStatus,
            auditMessageId:'',
            auditMessage:''

        };
        let header = {};

        if(this.audit.auditStatus==='FAIL'){

            if( this.audit.auditMessageId ===''){
                document.querySelector('#auditMessageTip').innerHTML='请选择拒绝原因'
                return ;
            }
            param.auditMessageId = JSON.parse(this.audit.auditMessageId).ID;
            param.auditMessage = JSON.parse(this.audit.auditMessageId).EN;
        }

        let that = this;
        let modalInstance = this.$uibModal.open({
            animation: false,
            template: pwdDialog,
            scope: this.scope,
            controller() {
            }
        });


        this.scope.ok = function (value) {
            if (value === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            header['login-password'] = value;

            that.service.residenceAuthenticationAudit(param,header).then(rep =>{
                this.isLoading = false;
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功！');
                    that.$location.url('/certification/address/current');

                    that.scope.$root.updateMenuUnverifyNum();
                }else{
                    if(rep.code === window.CODE.PAY_PWD.CODE){
                        window.toast('密码错误，请重试');
                    }else{
                        window.toast(rep.msg);
                    }
                }
            })
        };

        this.scope.cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            this.scope.$$password = '';
        });


    }
}

export default ListController;


