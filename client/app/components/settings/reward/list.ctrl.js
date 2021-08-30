const config = {
    PAGE_SIZE: 10,
}
// import coinConfig from '../../../common/coinConfig';

import MathTool from '../../../common/mathTool'

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, settingsSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = settingsSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.$scope.coinList = $scope.$root.$coinList;
        this.condition = {
            pageNo: 1,
            pageSize: config.PAGE_SIZE,
        };

        this.addMoney = {
            coinType:this.$scope.coinList[0].value,
            rewardNum:''
        }
        this.init();
    }

    init() {
        this.fetchList();
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    //新增分配币种
    addType(){
        let param = Object.assign({}, this.addMoney);
        if(!param.coinType){
            window.toast('请输入币种名称');
            return false;
        }
        if(!param.rewardNum){
            window.toast('请输入币种数量');
            return false;
        }
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        this.service.insertRewardConfig(param).then(data=>{
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (data.code === window.CODE.SUCCESS) {
                window.toast('添加分配奖励币种成功');
                this.fetchList();
            } else {
                window.toast(data.msg);
            }
            console.log(data);
        })
    }

    //标记发放
    upStatus(obj){
        this.service.allocateCoinToUserIep({id:obj.id}).then(data=>{
            if (data.code === window.CODE.SUCCESS) {
                window.toast('发放币种成功');
                this.fetchList();
            } else {
                window.toast(data.msg);
            }
            console.log(data);
        })
    }
    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, this.condition);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        this.service.getAllconfigInfo(param).then(rep => {
            this.isLoading = false;
            console.log(rep)
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

}


export default ListController;
