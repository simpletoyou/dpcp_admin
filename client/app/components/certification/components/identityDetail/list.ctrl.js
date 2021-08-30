/**
 * author zhaojing
 */
import pwdDialog from '../passwordDialog.html'
import CONFIG from './config'
class ListController {
    $onInit () {

    }

    constructor($rootScope,$scope, securitySvc, inviteSvc, $location,$uibModal) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.rootScope = $rootScope;
        this.scope = $scope;
        this.service = securitySvc;
        this.inviteService = inviteSvc;
        this.$location = $location;
        this.$uibModal = $uibModal;

        this.isLoading = false;
        this.totalNum = 0;
        this.optionFlag = false;

        this.id=this.$location.search().id;
        this.opt = this.$location.search().opt;


        this.basicInfo = {};
        this.identityInfo={};
        this.identityHistory = [];

        this.audit = {
            auditStatus:'FAIL',
            auditMessageId:''
        };
        this.scope.imgs = {
            pdf: require('../pdf.png'),
        };

        this.init();
        this.CONFIG = CONFIG;


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
     * 获取身份认证信息
     */
    fetchList() {
        this.isLoading = true;
        this.service.identityAuthenticationItem({id:this.id}).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.basicInfo = rep.data.userBasicInfoDto;
                this.identityInfo.country = rep.data.identificationDto.country;
                this.identityInfo.cardType = rep.data.identificationDto.cardType;
                this.identityInfo.cardNo = rep.data.identificationDto.cardNo;
                this.identityInfo.expiredDate = rep.data.identificationDto.expiredDate;
                this.identityInfo.cardPhoto = this.formatPhoto(rep.data.identificationDto.cardPhoto);
                this.identityInfo.cardHandhold = this.formatPhoto(rep.data.identificationDto.cardHandhold);
                this.identityInfo.cardTranslate = this.formatPhoto(rep.data.identificationDto.cardTranslate);
                this.identityHistory = _.filter(rep.data.userIdentificationList, function(item) {
                    return item.auditStatus!=='INIT';
                });
                this.totalNum = rep.data.totalNum;

            } else {
                window.toast(rep.msg);
            }
        })
    }

    formatPhoto(photoStr){
        return JSON.parse(photoStr);
        // if(photoStr!='[]'){
        //     let photoArr = photoStr.substring(1,photoStr.length-1).split(',');
        //     let arr = photoArr.map(function (url) {
        //         return url.substring(1,url.length-1);
        //     });
        //     return arr;
        // }else{
        //     return null;
        // }
    }

    focusOnAuditMessage(){
        document.querySelector('#auditMessageTip').innerHTML=''
    }

    disableSelect(){
        document.querySelector('#auditMessage').disabled = true
    }

    enableSelect(){
        document.querySelector('#auditMessage').disabled = false
    }

    //审核身份认证信息
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
                document.querySelector('#auditMessageTip').innerHTML='请选择拒绝原因';
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

            that.service.identityAuthenticationAudit(param,header).then(rep =>{
                this.isLoading = false;
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功！');
                    that.$location.url('/certification/identity/current');
                    that.scope.$root.updateMenuUnverifyNum();
                    that._setReward(that.basicInfo.uid, header);
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

    /**
     * 发放奖励
     */
    _setReward(uid, header) {
        const ACTIVITY_NAME = '0118invite';
        this.inviteService.rewardGrant({
            activityName: ACTIVITY_NAME,
            uid: uid
        }, header).then(rep => {
            if(rep.code === window.CODE.SUCCESS){
                console.log('发放奖励成功');
            }else{
                window.toast(rep.msg);
            }
        });
    }


}

export default ListController;


