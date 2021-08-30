/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import moment from 'moment';
import confirm from '../../components/confirm/confirm';

import passwordDialog from './passwordDialog.html';


const STATUS_NOT_OPEN = 'INIT';
const STATUS_HAS_OPEN = 'LISTED';
const STATUS_CLOSED = 'DELISTED';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, $uibModal, tradeControlSvc) {
        "ngInject";

        this.$scope = $scope;
        this.service = tradeControlSvc;

        this.$uibModal = $uibModal;

        this.isLoading = false;

        this.STATUS_NOT_OPEN = STATUS_NOT_OPEN;
        this.STATUS_HAS_OPEN = STATUS_HAS_OPEN;
        this.STATUS_CLOSED = STATUS_CLOSED;

        this.list = [];
        // $.map($scope.$root.$symbolList, (item, index) => {
        //     this.transactionFee[item.value] = '';
        //     this.transactionInput[item.value] = '';
        // });
        //
        // $.map($scope.$root.$coinList, (item, index) => {
        //     this.withdrawFee[item.value] = '';
        //     this.withdrawInput[item.value] = '';
        // });

        this.init();
    }

    init() {
        this.fetchList();
    }



    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        this.service.list({
            pageNo: 0,
            pageSize: 100
        }).then(rep => {
            this.isLoading = false;
            this.list = rep.data.list;
            this.totalNum = rep.data.total;
        });
    }

    /**
     * 更新状态
     */
    update(symbol, status, operText) {
        let that = this;
        confirm('确定要' + operText + '交易对' + symbol + '吗?', () => {


            let modalInstance = this.$uibModal.open({
                template: passwordDialog,
                scope: this.$scope,
                controller() {
                }
            });

            this.$scope.$$ok = function (password) {
                window.toast('请稍候...');
                that.service.update({
                    symbol: symbol,
                    status: status
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

        });
    }

}


export default ListController;
