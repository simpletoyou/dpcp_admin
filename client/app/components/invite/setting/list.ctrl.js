/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import moment from 'moment';
import config from '../config';
import confirm from '../../../components/confirm/confirm';

import passwordDialog from '../passwordDialog.html';

const ACTIVITY_NAME = '0118invite';
const INVITE_CONFIG = {
    INVITER: {
        TITLE: '单次推荐奖励配置'
    },
    INVITED: {
        TITLE: '50元礼包配置'
    }
};

let ACTIVITY_ID;

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, inviteSvc, $uibModal) {
        "ngInject";

        this.$scope = $scope;
        this.service = inviteSvc;

        this.$uibModal = $uibModal;

        this.isLoading = true;

        this.registerRewardList = [];
        this.inviteRewardList = [];

        // 50元注册礼包
        this.registerRewardForm = {
            assetCode: '',
            value: ''
        };
        // 单次推荐礼包
        this.inviteRewardForm = {
            assetCode: '',
            value: ''
        };

        this.condition = {
            pageNo: 1,
            pageSize: 100
        };

        this.registerRewardMap = {};    // 注册礼包
        this.inviteRewardMap = {};      // 推荐礼包

        this.registerRewardInput = {};
        this.inviteRewardInput = {};

        this.list = [];

        this.activityInfo = {};

        this.init();
    }

    init() {
        this._resetInputMap();
        this.queryActivityStatus();
        this.fetchList();
    }

    _resetInputMap() {
        $.map(this.$scope.$root.$coinList, (item, index) => {
            this.registerRewardInput[item.value] = '';
            this.inviteRewardInput[item.value] = '';
        });
    }

    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        this.service.rewardConfigQuery(this.condition).then(rep => {
            this.isLoading = false;
            let list = rep.data.list;
            let registerRewardList = [];
            let inviteRewardList = [];

            $.map(list, (item, index) => {
                ACTIVITY_ID = item.activityId;
                if (item.inviteType === 'INVITER') {    // 邀请人
                    this.inviteRewardMap[item.rewardAssetCode] = item;
                    inviteRewardList.push(item);
                } else if (item.inviteType === 'INVITED') {
                    registerRewardList.push(item);
                }
            });

            this.registerRewardList = registerRewardList;
            this.inviteRewardList = inviteRewardList;
        })
    }

    queryActivityStatus() {
        this.service.queryActivityStatus({
            activityName: ACTIVITY_NAME,
            pageNo: this.condition.pageNo,
            pageSize: this.condition.pageSize
        }).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.activityInfo = rep.data.list[0];
            } else {
                window.toast(rep.msg);
            }
        });
    }

    updateActivityStatus(status) {
        let that = this;

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            window.toast('请稍候...');
            that.service.updateActivityStatus({
                activityName: ACTIVITY_NAME,
                status: status
            }, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功', {
                        callback() {
                            that.queryActivityStatus();
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
     * 更新配置
     */
    updateConfig(inviteType, assetCode, inputValue, status) {

        let that = this;
        let param = {
            activityId: ACTIVITY_ID,
            rewardAssetCode: assetCode,
            inviteType: inviteType,
        };

        // 删除
        if (status === 'OFF') {
            param.amount = +inputValue;
            param.status = 'OFF';
        } else {    // 更新&添加
            inputValue = $.trim(inputValue);

            if (assetCode === '') {
                window.toast(`请选择${assetCode}的${INVITE_CONFIG[inviteType].TITLE}的资产类型`);
                return;
            }

            if (inputValue === '') {
                window.toast(`请输入${assetCode}的${INVITE_CONFIG[inviteType].TITLE}的数量！`);
                return;
            }

            inputValue = +inputValue;

            if (inputValue <= 0) {
                window.toast(`${assetCode}的${INVITE_CONFIG[inviteType].TITLE}的数量 > 0`);
                return;
            }

            param.amount = inputValue;
            param.status = 'ON';
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (password) {
            window.toast('请稍候...');
            that.service.configUpdate(param, {
                'login-password': password
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('操作成功', {
                        callback() {
                            that.fetchList();
                            // that._resetInputMap();
                            if (inviteType === 'INVITER') {
                                that.inviteRewardForm = {
                                    assetCode: '',
                                    value: ''
                                };
                            } else if (inviteType === 'INVITED') {
                                that.registerRewardForm = {
                                    assetCode: '',
                                    value: ''
                                };
                            }
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
     * 删除对应配置
     * @param id
     */
    deleteConfig(id) {

    }

}


export default ListController;
