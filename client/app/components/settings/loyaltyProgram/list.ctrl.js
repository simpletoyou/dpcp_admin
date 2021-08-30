import PlanAllocation from './PlanAllocation.html'

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
    constructor($scope, loyaltySvc , $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.loyaltySvc= loyaltySvc ;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.financeList = [];
        this.uidList = [];
        this.$scope.coinList = $scope.$root.$coinList;
        this.condition = {
            uid: '',
            assetCode:this.$scope.coinList[0].value,
            amount: '',
            pageNo: 1,
            pageSize: 10,
            type: ''
        };
        //分页数据
        this.$scope.totalNum = 0
        this.$scope.pageSize = 10
        this.pageNo = 1
        // 列表信息汇总
        this.totalInfo = {
            isenable: ''
        }
        this.form = {
            ID:'',
            UID:'',
            USERID:'',
            ASSETCODE:'',
            ASSETCODESU:'',
            TRANSACTIONDAY:'',
            ANNUALIZEDYIELD:'',
            MINIMUMLIFTING:'',
            UNLOCK:'',
            TRANSACTIONDAYS:'',
            ANNUALIZEDYIELDS:'',
            MINIMUMLIFTINGS:'',
            LIMITNUMBERS:'',
            USERIDS:'',
            ASSETCODESD:'',
        };
        this.rmbUsed = 0;
        this.rmbLocked = 0;
        this.totalNum = 0;
        this.list = [];
        // 资产类型
        this.currentAsset = {};
        this.UNLOCK_NUM_PERCENT = [];
        this.$scope.$$UNLOCK_NUM_PERCENTS=[];
        this.init();
    }

    init() {
        this.fetchList();
        //当筛选类别改变时清空搜索框
        // this.$scope.$watch('keyWord', (newValue, oldValue) => {
        //     this.$scope.keyWordText = '';
        // });
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
        let param = {
            pageSize: this.$scope.pageSize,
            pageNo: this.pageNo
        }
        this.loyaltySvc.queryLoyalPlanAllocation(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                // 展示列表
                this.list = rep.data.list;
                console.log(rep.data.isenable);
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }

        })
    }
    //是否上线
    createUplanallocation(obj) {
        // Integer uid, String assetCode, Integer transactionStatus, Integer putforwardStatus
        let param = {
            id:obj.id,
        }
        param.status = obj.status == 'NOT_ON_LINE' ? 'ALREADY_ONLINE' : 'NOT_ON_LINE'
        this.isLoading = true;
        this.loyaltySvc.updatePlanallocationByStatus(param).then(data => {
            this.isLoading = false;
            if (data.code == window.CODE.SUCCESS) {
                window.toast(data.msg)
                this.fetchList()
            } else {
                window.toast(data.msg)
            }
        })
    }

    submit() {


        if ($.trim(this.form.ASSETCODES) === '') {
            window.toast('请选择币种');
            return;
        }
        if ($.trim(this.form.TRANSACTIONDAY) === '') {
            window.toast('请选择计划类型');
            return;
        }
        if ($.trim(this.form.ANNUALIZEDYIELD) === '') {
            window.toast('请输入年化收益率');
            return;

        }
        if ($.trim(this.form.ANNUALIZEDYIELD) < parseInt(1)) {
            window.toast('年化收益率不能低于1');
            return;

        }
        if (this.form.ANNUALIZEDYIELD != parseInt(this.form.ANNUALIZEDYIELD)) {
            window.toast('请输入正整数');
            return;

        }
        if ($.trim(this.form.MINIMUMLIFTING) === '') {
            window.toast('请输入起投数量');
            return;
        }
        if ($.trim(this.form.MINIMUMLIFTING) < parseInt(1)) {
            window.toast('起投数量不能低于1');
            return;
        }
        if ($.trim(this.UNLOCK_NUM_PERCENT[0]) === '') {
            window.toast('请输入最低限购数量');
            return;
        }
        if (this.UNLOCK_NUM_PERCENT[0] != parseInt(this.UNLOCK_NUM_PERCENT[0])) {
            window.toast('请输入正整数');
            return;

        }
        if ($.trim(this.UNLOCK_NUM_PERCENT[0]) < parseInt(1)) {
            window.toast('最低限购数量不能低于1');
            return;
        }
        if ($.trim(this.UNLOCK_NUM_PERCENT[1]) === '') {
            window.toast('请输入最高限购数量');
            return;
        }
        if (this.UNLOCK_NUM_PERCENT[1] != parseInt(this.UNLOCK_NUM_PERCENT[1])) {
            window.toast('请输入正整数');
            return;

        }
        if ($.trim(this.UNLOCK_NUM_PERCENT[1]) < parseInt(1)) {
            window.toast('最高限购数量不能低于1');
            return;
        }
        if ($.trim(this.UNLOCK_NUM_PERCENT[1]) < $.trim(this.UNLOCK_NUM_PERCENT[0])) {
            window.toast('最低限购数量不能大于最高限购数量');
            return;

        }
        if ($.trim(this.form.USERID) === '') {
            window.toast('请输入用户UID');
            return;
        }
        this.form.UNLOCK_NUM_PERCENT = this.UNLOCK_NUM_PERCENT[0] + '-' + this.UNLOCK_NUM_PERCENT[1]
        this.loyaltySvc.savePlanallocation(this.form).then(data => {
            if (data.code == window.CODE.SUCCESS) {
                let arrays = null;
                this.timeStamp = arrays;
                this.form.ASSETCODES='';
                this.form.TRANSACTIONDAY='';
                this.form.ANNUALIZEDYIELD='';
                this.form.MINIMUMLIFTING='';
                this.form.USERID='';
                this.UNLOCK_NUM_PERCENT[0]=this.timeStamp;
                this.UNLOCK_NUM_PERCENT[1]=this.timeStamp;
                window.toast('修改成功');
                this.fetchList();

            } else {
                window.toast(data.msg);
            }

        })

    }
    updatesubmit(assetCode,transactionDay,annualizedYield,minimumLifting,limitNumber1,limitNumber2,uid,fn) {

        if (this.$scope.$$assetCode === '') {
            window.toast('请选择币种');
            return;
        }
        if (this.$scope.$$assetCode === ''){
            if (assetCode === '') {
                window.toast('请选择币种');
                return;
            }
        }

           if (this.$scope.$$TransactionDay === '') {
               window.toast('请选择计划类型');
               return;
           }
        if(this.$scope.$$TransactionDay === ''){
            if (transactionDay === '') {
                window.toast('请选择计划类型');
                return;
            }
        }

        if (annualizedYield === '') {
            window.toast('请输入年化收益率');
            return;

        }
        if (annualizedYield < parseInt(1)) {
            window.toast('年化收益率不能低于1');
            return;

        }
        if (annualizedYield != parseInt(annualizedYield)) {
            window.toast('请输入正整数');
            return;

        }
        if (minimumLifting === '') {
            window.toast('请输入起投数量');
            return;
        }
        if (minimumLifting < parseInt(1)) {
            window.toast('起投数量不能低于1');
            return;
        }
        if (limitNumber1 === '') {
            window.toast('请输入最低限购数量');
            return;
        }
        if (limitNumber1 != parseInt(limitNumber1)) {
            window.toast('请输入正整数');
            return;

        }
        if (limitNumber1 < parseInt(1)) {
            window.toast('最低限购数量不能低于1');
            return;
        }
        if (limitNumber2 === '') {
            window.toast('请输入最高限购数量');
            return;
        }
        if (limitNumber2 != parseInt(limitNumber2)) {
            window.toast('请输入正整数');
            return;

        }
        if (limitNumber2 < parseInt(1)) {
            window.toast('最高限购数量不能低于1');
            return;
        }

        if (limitNumber2 < limitNumber1) {
            window.toast('最低限购数量不能大于最高限购数量');
            return;

        }
        if (uid === '') {
            window.toast('请输入用户UID');
            return;
        }
        this.form.ID=this.$scope.$$planId
        if (this.$scope.$$assetCode != ''){
            this.form.ASSETCODESD=this.$scope.$$assetCode
        }
        if (assetCode != ''){
            this.form.ASSETCODESD=assetCode
        }
        if(this.$scope.$$TransactionDay != ''){
            this.form.TRANSACTIONDAYS=this.$scope.$$TransactionDay
        }
        if(transactionDay != ''){
            this.form.TRANSACTIONDAYS=transactionDay
        }
        this.form.LIMITNUMBERS = limitNumber1 + '-' + limitNumber2
        this.form.USERIDS=uid

        this.form.ANNUALIZEDYIELDS=annualizedYield
        this.form.MINIMUMLIFTINGS=minimumLifting
        this.loyaltySvc.updatePlanallocation(this.form).then(data => {
            if (data.code == window.CODE.SUCCESS) {
                fn();
                let arrays = null;
                this.timeStamp = arrays;
                this.form.USERIDS='';
                this.form.ASSETCODESD='';
                this.form.TRANSACTIONDAYS='';
                this.$scope.$$assetCode='';
                this.$scope.$$TransactionDay='';
                this.form.ANNUALIZEDYIELDS='';
                this.form.MINIMUMLIFTINGS='';
                this.UNLOCK_NUM_PERCENT[0]=this.timeStamp;
                this.UNLOCK_NUM_PERCENT[1]=this.timeStamp;
                window.toast('修改成功');
                this.fetchList();

            } else {
                window.toast(data.msg);
            }
        })

    }
    /**
     * 删除
     * */
/*    deleteAllocationProportion(id) {
        let that = this;
        that.dongjiefrozenSvc.deleteAllocationProportion({ID: id}).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                window.toast('请稍候...', {
                    callback() {
                        window.toast(rep.msg);
                        that.fetchList();
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }*/
    showPlanAllocationById(id) {
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: PlanAllocation,
            scope: this.$scope,
            controller() {}
        });
        this.loyaltySvc.getPlanAllocationId({ID: id}).then(rep => {
            this.isLoading = false;

            if (rep.code === window.CODE.SUCCESS) {
                // console.log(JSON.parse(rep.data));
                that.data = rep.data;
                this.$scope.$$planId = that.data.id
                this.$scope.$$userid = that.data.uid
                this.$scope.$$assetCode= that.data.assetCode
                this.$scope.$$TransactionDay=that.data.transactionDay
                this.$scope.$$annualizedYield = that.data.annualizedYield
                this.$scope.$$minimumLifting = that.data.minimumLifting
                this.$scope.$$UNLOCK_NUM_PERCENTS[0] = that.data.limitNumber1
                this.$scope.$$UNLOCK_NUM_PERCENTS[1] = that.data.limitNumber2
            } else {
                setTimeout(() => {
                    window.history.back()
                }, 1000)
                window.toast(rep.msg);
            }
        })
       this.$scope.$$ok = function (assetCode,transactionDay,annualizedYield,minimumLifting,limitNumber1,limitNumber2,uid) {

            that.updatesubmit(assetCode,transactionDay,annualizedYield,minimumLifting,limitNumber1,limitNumber2,uid,function () {
                modalInstance.dismiss('ok');
            })

        }
        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
            that.$scope.$$assetCode='';
           that.form.TRANSACTIONDAYS='';
            that.fetchList();
        };
    }
    changeSymbol() {
        // console.log(this.condition.symbol)
    }
}


export default ListController;
