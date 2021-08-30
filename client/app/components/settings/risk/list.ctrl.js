
import config from '../config';

import passwordDialog from '../passwordDialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, settingsSvc, $uibModal,$location,$cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = settingsSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.list = null;
        this.limitList_level0 = {};

        this.limitList_level1 = {};

        this.limitList_level2 = {};

        this.levels = [0,1,2];

        this.config = config;
        this.isLoading = false;

        this.condition = {
            uid: '',
            pageNo:1,
            pageSize:20

        };
        this.init();
    }

    init() {
        this.initLimitList();
        this.fetchIPLog();
        this.fetchLimitListByLevel();

    }


    initLimitList(){
        $.map(this.$scope.$root.$coinList, (item, index) => {
            this.levels.forEach((level,index)=>{
                this['limitList_level'+level][item.value] = {
                    limit:null,
                    update:null,
                    isEdit:false
                };
            });
        });
    }

    /**
     * 获取每日限额
     *
     */

    fetchLimitListByLevel() {
        this.levels.forEach((item)=>{
            let param = {
                key:config['WITHDRAWLEVEL_'+item]
            };

            this.service.configQuery(param).then(rep => {
                this.isLoading = false;
                if(rep.code === window.CODE.SUCCESS){
                    let list = rep.data;
                    let temp = this['limitList_level'+item];
                    $.map(list, (item) => {
                        temp[item.assetCode] = {
                            limit:item.profileValue ,
                            update:null,
                            isEdit:false
                        };
                    });
                }else{
                    window.toast(rep.msg);
                }
            })
        })

    }

    /**
     * 打开输入密码对话框
     * @param item
     */
    updateLimitByLevel(assetType,updateVal,level) {
        let that = this;

        if ($.trim(updateVal) === '') {
            window.toast(`请输入${assetType}的提币每日限额！`);
            return;
        }

        let modalInstance = this.$uibModal.open({
            animation: false,
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (value) {
            if (value === '') {
                window.toast('请输入当前账号密码');
                return;
            }

            window.toast('请稍候...');
            that.service.configUpdate({
                key: config['WITHDRAWLEVEL_'+level],
                asset: assetType,
                value: updateVal
            },{
                'login-password': value
            }).then(rep => {

                if(rep.code === window.CODE.SUCCESS){
                    window.toast(rep.msg);
                    modalInstance.dismiss('ok');
                    that.fetchLimitListByLevel();
                    that['limitList_level'+level][assetType].isEdit = false;
                }else{
                    window.toast(rep.msg);
                }
            })
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            this.$scope.$$password = '';
        });
    }






    fetchIPLog(){
        this.service.ipQuery({
            pageSize:this.condition.pageSize,
            pageNo:this.condition.pageNo
        }).then(rep =>{
            this.isLoading = false;
            if(rep.code === window.CODE.SUCCESS){
                this.list = rep.data.list;
                this.totalNum = rep.data.total;
            }else{
                window.toast(rep.msg);
            }
        });
    }


    pageChanged() {
        //带参数的查询
        this.fetchIPLog();
    }

}


export default ListController;
