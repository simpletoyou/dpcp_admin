/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import moment from 'moment';
import config from '../config';
import confirm from '../../../components/confirm/confirm';

import passwordDialog from '../passwordDialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, lockCoinSvc, $uibModal) {
        "ngInject";

        this.$scope = $scope;
        this.service = lockCoinSvc;

        this.$uibModal = $uibModal;

        this.isLoading = false;

        this.condition = {
            pageNo: 1,
            pageSize: 100
        };

        this.list = [];
        this.year =  moment().utc().utcOffset(8).format('YYYY');
        this.month =  moment().utc().utcOffset(8).format('M');
        this.months = [];

        this.unlock = {
            uid:'',
            assetCode:'ACT'
        };

        this.init();
    }

    init() {
        this.fetchList();

        for(let i = 1;i<= 12;i++){
            this.months.push(i);
        }
    }

    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        this.service.configList(this.condition).then(rep => {
            this.isLoading = false;
            let list = rep.data.list;
            $.map(list, (item, index) => {
                item.inputValue = '';   // 这里记录更新的天数
            });
            this.list = list;
        })
    }

    /**
     * 更新配置
     * @param assetCode
     * @param inputValue
     * @param type
     */
    updateConfig(assetCode, inputValue, type) {
        let that = this;

        inputValue = $.trim(inputValue);

        if (inputValue === '') {
            window.toast(`请输入${assetCode}的参数值！`);
            return;
        }

        inputValue = +inputValue;

        if (type === 'LOCKDAY') {

            if (inputValue < 1 || inputValue > 28) {
                window.toast(`请输入1-28的整数！`);
                return;
            }

            if (/^\d+$/g.test(inputValue) === false) {
                window.toast(`请输入1-28的整数！`);
                return;
            }
        } else if (type === 'REWARDGRANTRATE') {

            if (inputValue < 0 || inputValue > 1) {
                window.toast(`请输入0-1的值！`);
                return;
            }

        } else if (type === 'FOUNDATIONUID') {
            if (/^\d+$/g.test(inputValue) === false) {
                window.toast(`请输入整数！`);
                return;
            }
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            window.toast('请稍候...');
            that.service.configUpdate({
                assetCode: assetCode,
                key: type,
                value: inputValue
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功', {
                        callback() {
                            that.fetchList();
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
     * 清算
     * */
    lockCalculateReward(){
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            window.toast('请稍候...');

            that.service.lockCalculateReward({
                assetCode: 'ACT',
                rewardYear:that.year,
                rewardMonth:that.month
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功', {

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
     * 发放
     * */
    lockGrantReward(){
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            window.toast('请稍候...');

            that.service.lockGrantReward({
                assetCode: 'ACT',
                rewardYear:that.year,
                rewardMonth:that.month
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功', {

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
     *
     * 强制解锁
     * */
    forceUnlock(){
        let that = this;

        if(!that.unlock.uid.trim()){
            window.toast('请输入uid');
            return;
        }
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            window.toast('请稍候...');

            that.service.forceUnlock({
                uid:that.unlock.uid,
                assetCode: that.unlock.assetCode,
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功');
                    that.unlock.uid = '';
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
