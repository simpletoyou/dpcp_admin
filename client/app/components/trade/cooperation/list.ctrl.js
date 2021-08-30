const config = {
    PAGE_SIZE: 10,
}
// import coinConfig from '../../../common/coinConfig';

import valueDialog from './Dialog.html'

import MathTool from '../../../common/mathTool'

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
        this.init();
    }

    init() {
        this.fetchList();
        //当筛选类别改变时清空搜索框
        // this.$scope.$watch('keyWord', (newValue, oldValue) => {
        //     this.$scope.keyWordText = '';
        // });
    }


    setrewardCaptain() {
        this.service.setrewardCaptain().then(data => {
            if (data.code == '100200') {
                window.toast('操作成功');
            } else {
                window.toast(data.msg);
            }
        })
    }

    rewardCaptain() {
        this.service.rewardCaptain().then(data => {
            if (data.code == '100200') {
                window.toast('操作成功');
            } else {
                window.toast(data.msg);
            }
        })
    }

    nodeClose(item) {
        let that = this;
        this.service.nodeClose({
            nodeId: item.id
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
    }

    setManage(type, item) {
        let that = this;
        let name = type == 'predict' ? "setManagePredict" : "setManageAllot";
        this.service[name]({
            nodeId: item.id
        }).then(rep => {
            if (rep.code == '100200') {
                window.toast('操作成功', {
                    callback() {
                        that.fetchList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        })
    }

    setNodeType(type, item) {
        let that = this;
        if (type == 'status') {
            this.service.setNode({
                id: item.id,
                type: 'status',
                value: 'PROCESSING'
            }).then(data => {
                if (data.code == '100200') {
                    window.toast('操作成功', {
                        callback() {
                            that.fetchList();
                        }
                    });
                } else {
                    window.toast(rep.msg);
                }
            })
        } else {
            let modalInstance = this.$uibModal.open({
                template: valueDialog,
                scope: this.$scope,
                controller() {}
            });

            this.$scope.$$ok = function (value) {
                window.toast('请稍候...');
                that.service.setNode({
                    id: item.id,
                    type: 'profit',
                    value: value
                }).then(data => {
                    if (data.code == '100200') {
                        window.toast('操作成功', {
                            callback() {
                                that.fetchList();
                            }
                        });
                    } else {
                        window.toast(rep.msg);
                    }
                })
                modalInstance.dismiss('ok');
            };

            this.$scope.$$cancel = function () {
                modalInstance.dismiss('cancel');
            };
        }
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }
    statusFun(item) {
        switch (item) {
            case "INIT":
                return "组队中";
                break;
            case "PROCESSING":
                return "挖矿中";
                break;
            case "OVER":
                return "挖矿结束";
                break;
            case "ESTABLISHING":
                return "组队完成";
                break;
            default:
                break;
        }
    }

    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        // let param = Object.assign({}, this.condition);
        // this.mergeSearch(param);
        this.isLoading = true;
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.service.getNodeList({
            pageNo: this.pageNo,
            pageSize: this.pageSize
        }).then(rep => {
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
        if (this.$scope.buyUid) {
            param.buyUid = this.$scope.buyUid
        }
        if (this.$scope.sellUid) {
            param.sellUid = this.$scope.sellUid
        }
        if (this.$scope.tid) {
            param.transOrderId = this.$scope.tid;
        }
        if (this.$scope.beginTime instanceof Date) {
            param.beginTime = this.$scope.$root.moment(this.$scope.beginTime).format('YYYY-MM-DD HH:mm:ss');
        }
        if (this.$scope.endTime instanceof Date) {
            param.endTime = this.$scope.$root.moment(this.$scope.endTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}


export default ListController;