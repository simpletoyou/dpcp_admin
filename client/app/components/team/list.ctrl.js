const config = {
    PAGE_SIZE: 10,
}
// import coinConfig from '../../../common/coinConfig';
import passwordDialog from './passwordDialog.html';
import MathTool from '../../common/mathTool'

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
            {label:'全部',value:'全部'},
            {label:'申请绑定',value:'APPLY_FOR_BIND'},
            {label:'绑定成功',value:'BIND_SUCCESS'},
            {label:'绑定失败',value:'BIND_FAIL'},
        ]

        this.$scope.beginTime = '';
        this.$scope.endTime = '';
        this.$scope.pUid = '';
        this.$scope.cUid = '';
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


    showDialog(obj,param) {
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {}
        });


        this.$scope.$$ok = function(textarea) {

            // that.service.coinConfirm(confirmParam, {
            //     'login-password': password
            // }).then(rep => {
            //     if (rep.code === window.CODE.SUCCESS) {
            //         window.toast('操作中……', {
            //             callback() {
            //                 window.toast(rep.msg);
            //                 that.fetchList();
            //                 that.$scope.$root.updateMenuUnverifyNum();
            //             }
            //         });
            //     } else {
            //         window.toast(rep.msg);
            //     }
            // });
            param.refuseInfo = textarea;
            that.setStatus(obj,'',param);
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function() {
            modalInstance.dismiss('cancel');
        };
    }


    // 标记是否通过
    setStatus(obj,status,newobj){
        let param = {
            id:obj.id,
            status:status
        };
        if(newobj){
            param=newobj;
        }else {
            if(param.status=='BIND_FAIL'){
                this.showDialog(obj,param);
                return
            }
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
        this.service.getTeamRelationList(param).then(data=>{
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
        if (this.$scope.pUid) {
            param.pUid = this.$scope.pUid
        }
        if (this.$scope.cUid) {
            param.cUid = this.$scope.cUid
        }
        if (this.status != '全部') {
            param.status = this.status
        }
    }

    changeSymbol() {
        // console.log(this.condition.symbol)
    }
    /**
     * 日期起始时间变化
     * @param {Date | *} beginTime
     */
    changeStartDate(beginTime) {
        if (beginTime instanceof Date) {
            this.$scope.min = this.$scope.$root.moment(beginTime).add(1, 'days').format('YYYY-MM-DD');
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
