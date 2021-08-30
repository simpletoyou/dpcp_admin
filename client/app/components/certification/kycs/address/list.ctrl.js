/**
 * author zhaojing
 */
import passwordDialog from './passwordDialog.html'

import rejectDialog from './rejectDialog.html';
var zhengjianBG = require('./imgs/my.png');
import CONFIG from './config'
//构造函数，构造拖拽对象
function DragObj(id){
    var self = this;
    this.box = document.getElementById(id);
    //==添加方法
    this.startMove = function(x,y){
        this.disX = x - document.getElementById('imgMovs').offsetLeft;
        this.disY = y - document.getElementById('imgMovs').offsetTop;
        //移动事件
        document.onmousemove = function(evt){
            var oEvent = evt || event;

            self.moving(oEvent.clientX,oEvent.clientY);
        }
        //松开事件
        document.onmouseup = function(){

            self.stopMove();
        }
    }
    this.moving = function(x,y){
        document.getElementById('imgMovs').style.left = x - this.disX + "px";
        document.getElementById('imgMovs').style.top  = y - this.disY + "px";
    }
    this.stopMove = function(){
        document.onmousemove = null;
        document.onmouseup   = null;
    }
    //给box添加鼠标按下事件
    this.box.onmousedown = function(evt){
        var oEvent = evt || event;
        self.startMove(oEvent.clientX,oEvent.clientY);
    }
}
class ListController {


    constructor($rootScope, $scope, securitySvc, $location, $uibModal) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.rootScope = $rootScope
        this.scope = $scope;
        this.$scope = $scope;
        this.$location = $location;
        this.service = securitySvc;
        this.$uibModal = $uibModal;

        this.list = null;
        this.isLoading = false;
        this.totalNum = 0;
        this.keyWord = 'uid';
        this.keyWordVal = '';

        this.zhengjianBG = zhengjianBG;

        this.condition = {
            "pageNo": 1,
            "pageSize": 100,
            "status": "INIT",
            // "status": ""
        };

        this.imgDialogSrc = '';
        this.imgDialogIsShow

        this.CONFIG = CONFIG;
        let that = this;

    }

    $onInit() {
        this.init();
    }
    /**
     * @return {null}
     */
    init() {
        // scrollTo(0,0);
        this.fetchList();

    }


    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        let param = Object.assign({}, this.condition);
        if (this.keyWord && this.keyWordVal != '') {
            param[this.keyWord] = this.keyWordVal;
        }
        this.service.residenceAuthenticationList(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.list.forEach((item, index) => {
                    item.residencePhoto = (item.residencePhoto != null) ? this.formatJsonParse(item.residencePhoto) : [];
                })

                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    // gotoOpt(val, opt) {
    //     this.rootScope.optionFlag = true;
    //     this.$location.url('/certification/address/detail?id=' + val + '&opt=' + opt);
    // }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    passDialog(auditStatus, id) {
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        let header = {};

        let param = {
            id: id,
            auditStatus: 'OK',
            auditMessageId: '',
            auditMessage: '',
            AuditDealStatus: 'FINISH'

        };

        this.$scope.$$ok = function(password) {

            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            header['login-password'] = password;

            that.request(param, header, that)

            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function() {
            modalInstance.dismiss('cancel');
        };
    }

    rejectDialog(auditStatus, id) {
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: rejectDialog,
            scope: this.$scope,
            controller() {}
        });

        let header = {};

        let param = {
            id: id,
            auditStatus: 'FAIL',
            AuditDealStatus: 'FINISH',
            auditMessageId: '', // 拒绝选项
            auditMessage: ''

        };

        this.$scope.$$ok = function(password, keyWordArg, textarea) {

            let keyWord = JSON.parse(keyWordArg);
            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }

            if (keyWord === '') {
                window.toast('请选择拒绝原因');
                return;
            }

            param.auditMessageId = keyWord.ID;
            param.auditMessage = keyWord.EN;

            header['login-password'] = password;

            that.request(param, header, that);
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function() {
            modalInstance.dismiss('cancel');
        };
    }

    request(param, header, that) {
        that.service.residenceAuthenticationAudit(param, header).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('操作成功！', {
                    callback() {
                        window.location.reload();
                    }
                });
                // that.scope.$root.updateMenuUnverifyNum();
            } else {
                if (rep.code === window.CODE.PAY_PWD.CODE) {
                    window.toast('密码错误，请重试');
                } else {
                    window.toast(rep.msg);
                }
            }
        })
    }

    showImg(photostr) {
        // 初级认证
        if (photostr && photostr.toUpperCase().indexOf('PDF') < 0) {
            this.imgDialogSrc = '/exchange_manager/common/photo?name=' + photostr || '';
            this.imgDialogIsShow = true;
        } else if (photostr && photostr.toUpperCase().indexOf('PDF') >= 0) {
            window.location.href = '/exchange_manager/common/photo?name=' + photostr
        }
        setTimeout(()=>{
            new DragObj('imgMov');
        },100)
    }

    closeImg() {
        this.imgDialogIsShow = false;
        this.imgDialogSrc = '';
    }
    formatJsonParse(photoStr) {
        return JSON.parse(photoStr);
    }

}

export default ListController;