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
    constructor($scope, teamSvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = teamSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;
        this.coinType = 'APA';
        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        this.$scope.status = [
            {label:'一级代理',value:'VIP1'},
            {label:'二级代理',value:'VIP2'},
            {label:'三级代理',value:'VIP3'},
        ]

        this.$scope.startTime = '';
        this.$scope.endTime = '';
        this.$scope.uid = '';
        this.$scope.vip = '';
        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.condition = {
            pageNum: 1,
            pageSize: config.PAGE_SIZE,
        };
        this.status = this.$scope.status[0].value

        this.init();
    }

    init() {
        this.fetchList();
    }

    // 标记是否通过
    setStatus(obj,status){
        let param = {
            id:obj.id,
            memberType:status
        }
        this.service.manageUserApplyBind(param).then(data=>{
            if(data.code == '100200'){
                this.fetchList();
            }else{
                window.toast(data.msg)
            }
            console.log(data)
        })
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }
    //返回用户状态
    returnUserState(state){
        switch(state){
            case 'APPLY_FOR_BIND':
                return '申请绑定'
                break;
            case 'BIND_SUCCESS':
                return '绑定成功'
                break;
            case 'BIND_FAIL':
                return '绑定失败'
                break;
        }
    }
    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;

        this.service.getTeamPerformance(param).then(data=>{
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if(data.code == '100200'){
                this.list = data.data.list;
                this.totalNum = data.data.pageNum * this.pageSize;
            }else{
                window.toast(data.msg)
            }
            console.log(data)
        });
    }
    /**
     * 合并搜索选项
     */
    mergeSearch(param) {
        if (this.$scope.uid) {
            param.uid = this.$scope.uid
        }
        // if (this.$scope.vip) {
        //     param.vip = this.$scope.vip
        // }


        if (this.$scope.startTime instanceof Date) {
            param.startTime = this.$scope.$root.moment(this.$scope.startTime).format('YYYY-MM-DD HH:mm:ss');
        }

        if (this.$scope.endTime instanceof Date) {
            param.endTime = this.$scope.$root.moment(this.$scope.endTime).format('YYYY-MM-DD HH:mm:ss');
        }

        if (this.status != '全部') {
            param.member = this.status
        }
    }

    changeSymbol() {
        // console.log(this.condition.symbol)
    }
    /**
     * 日期起始时间变化
     * @param {Date | *} beginTime
     */
    changeStartDate(startTime) {
        if (startTime instanceof Date) {
            this.$scope.min = this.$scope.$root.moment(startTime).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = false;
        } else {
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = true;
        }
    }

    changeEndDate(endTime) {}
}


export default ListController;
