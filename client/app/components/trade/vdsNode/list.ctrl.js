const config = {
    PAGE_SIZE: 10,
}
// import coinConfig from '../../../common/coinConfig';

import MathTool from '../../../common/mathTool'

import Dialog from './Dialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, cooperationSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = cooperationSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;
        this.pageNo = 1;
        this.id = '';
        this.init();
    }

    init() {
        this.fetchList();
        //当筛选类别改变时清空搜索框
        // this.$scope.$watch('keyWord', (newValue, oldValue) => {
        //     this.$scope.keyWordText = '';
        // });
    }

    setStatus(name, item) {
        let that = this;
        this.service.updateNodeProfit({
            id: item.id,
            nodeId: item.nodeId,
            nodeStatus: item.nodeStatus,
            dayProfit: item.dayProfit,
            allProfit: item.allProfit,
            draw: item.draw,
            runTime: item.onlineTime
        }).then(data => {
            if (data.code == '100200') {
                window.toast('操作成功', {
                    callback() {
                        that.fetchList();
                    }
                });
            } else {
                window.toast(data.msg)
            }
        })
    }

    showAdd() {
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: Dialog,
            scope: this.$scope,
            controller() {}
        });

        this.$scope.$$ok = function (nodeId, nodeAddress, nodeStatus) {
            if (!nodeId) {
                window.toast('请输入节点ID');
                return false;
            }
            if (!nodeAddress) {
                window.toast('请输入节点地址');
                return false;
            }
            if (nodeStatus == 'undefined') {
                window.toast('请选择节点状态');
                return false;
            }
            window.toast('请稍候...');
            that.service.addNodeProfit({
                nodeId,
                nodeAddress,
                nodeStatus: nodeStatus ? '启动' : '关闭'
            }).then(data => {
                if (data.code == '100200') {
                    window.toast('操作成功', {
                        callback() {
                            that.fetchList();
                        }
                    });
                } else {
                    window.toast(data.msg);
                }

            })
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, {
            pageNo: this.pageNo,
            pageSize: this.pageSize
        });
        this.mergeSearch(param);
        this.isLoading = true;
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.service.nodeProfitList(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.data.records
                this.totalNum = rep.data.data.pages * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    //查看个人信息
    // searchInfo(data) {
    //     this.userid = data;
    //     this.$location.url('/commonusers/personalinfo?uid=' + this.userid);
    // }
    /**
     * 合并搜索选项
     */
    mergeSearch(param) {
        if (this.id) {
            param.uid = this.id
        }
    }
}


export default ListController;