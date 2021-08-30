import passwordUserdict from './passwordUserdict.html'

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
    constructor($scope, dongjiefrozenSvc , $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.dongjiefrozenSvc= dongjiefrozenSvc ;
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
        // 列表信息汇总
        this.totalInfo = {
            isenable: ''
        }
        this.form = {
            UID:'',
            ASSETCODE:'',
            ASSETCODESU:'',
            UNLOCK:'',
            INDIVIDUAL_TYPE: '', //个人比例
            BOSS_TYPE: '', //直推比例
            COMPANY_TYPE: '', //团队比例
            ParamType: 'proportion',
            UDC_CHANGE_POINTS: '', //UDC转换比例
            COMPANY_ACCOUNT: '', //公司账户UID
            ACTUAL_ALLOCATE_POINTS: '', //当日实际分配的总UDC
            TEAM_ONE: '', //一级代理
            TEAM_TWO: '', //二级代理
            TEAM_THREE: '', //三级代理
            USER_INIT_RECOMMEND_NUM:'',//普通用户初始化推荐人数
            LOCK_NUM_PERCENT:'',//冻结百分比
            TRADE_COUNT_DAYS:'',//交易统计天数
            UNLOCK_NUM_PERCENT:'',//解冻基础百分率
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

    download() {
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        let url = window.location.href;
        if(url.indexOf('manager.smt-ex.com') >-1){
            this.$scope.url = '//manager.smt-ex.com'
        }else if(url.indexOf('http://manager.smt-ex.com/')>-1){
            this.$scope.url = '//http://manager.smt-ex.com/'
        }else{
            this.$scope.url = '//http://192.168.0.104:8180'
        }
        this.urlParam = []
        for (let i in param) {
            this.urlParam.push({
                key: i,
                value: param[i]
            })
        }

        setTimeout(() => {
            $('#download').click()
        }, 500)
    }

    /**
     * 获取列表
     * 带参数的搜索
     */


    fetchList() {
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        this.isLoading = true;
        this.dongjiefrozenSvc.UserDictList(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.dongjiefrozenSvc.saveDatePointsAllocateDict({keepeveryone:'LOCK'}).then(data=>{
                    if (data.code === window.CODE.SUCCESS) {
                    } else {
                        window.toast(data.msg);
                    }
                    console.log(data);
                })
                // 展示列表
                this.list = rep.data.list;
                this.totalInfo.isenable=rep.data.isenable;
                console.log(rep.data.isenable);
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }

        })
    }

    /**
     *  解锁
     */

    unlock(isenable){
        this.dongjiefrozenSvc.saveDatePointsAllocateDict({keepeveryone:isenable}).then(data=>{
            if (data.code === window.CODE.SUCCESS) {
                window.toast('锁定成功');
                this.fetchList();
            } else {
                window.toast(data.msg);
            }
            console.log(data);
        })
    }

    /**
     *  解锁
     */

    unlockSuccenss(isenable){
        let that = this;
        this.dongjiefrozenSvc.saveDatePointsAllocateDictFrozen({keepeveryone:isenable}).then(data=>{
            if (data.code === window.CODE.SUCCESS) {

                this.dongjiefrozenSvc.getDatePointsAllocateDictStatus({USERID:this.$scope.$$uid,ASSETCODE:this.$scope.$$assetCode}).then(rep => {
                    this.isLoading = false;
                    if (rep.code === window.CODE.SUCCESS) {
                        that.data = rep.data;
                        // 展示列表
                        this.$scope.$$dictStatus = that.data.isenableUser
                    } else {
                        window.toast(rep.msg);
                    }

                })
                /* window.toast('锁定成功');
                 this.fetchList();*/
            } else {
                window.toast(data.msg);
            }
            console.log(data);
        })
    }

    /**
     * 锁定
     * @param isenable
     */
    lock(isenable){
        this.dongjiefrozenSvc.saveDatePointsAllocateDict({keepeveryone:isenable}).then(data=>{
            if (data.code === window.CODE.SUCCESS) {
                window.toast('解锁成功');
                this.fetchList();
            } else {
                window.toast(data.msg);
            }
            console.log(data);
        })
    }
    lockSuccenss(isenable){
        let that = this;
        this.dongjiefrozenSvc.saveDatePointsAllocateDictFrozen({keepeveryone:isenable}).then(data=>{
            if (data.code === window.CODE.SUCCESS) {

                this.dongjiefrozenSvc.getDatePointsAllocateDictStatus({USERID:this.$scope.$$uid,ASSETCODE:this.$scope.$$assetCode}).then(rep => {
                    this.isLoading = false;
                    if (rep.code === window.CODE.SUCCESS) {
                        that.data = rep.data;
                        // 展示列表
                        this.$scope.$$dictStatus = that.data.isenableUser
                    } else {
                        window.toast(rep.msg);
                    }

                })
                /* window.toast('锁定成功');
                 this.fetchList();*/
            } else {
                window.toast(data.msg);
            }
            console.log(data);
        })
    }
    submit() {

 /*       if ($.trim(this.form.USERID) === '') {
            window.toast('请输入用户UID');
            return;
        }*/
        if ($.trim(this.form.ASSETCODES) === '') {
            window.toast('请选择币种');
            return;
        }


        if ($.trim(this.form.LOCK_NUM_PERCENT) === '') {
            window.toast('请输入冻结百分比');
            return;

        }
        if(this.totalInfo.isenable==='UNLOCK') {
            if ($.trim(this.form.TRADE_COUNT_DAYS) === '') {
                window.toast('请输入交易统计天数');
                return;

            }
        }
        if ($.trim(this.UNLOCK_NUM_PERCENT[0]) === '') {
            window.toast('请输入冻结条件分子');
            return;
        }

        if ($.trim(this.UNLOCK_NUM_PERCENT[1]) === '') {
            window.toast('请输入冻结条件分母');
            return;
        }

        if ($.trim(this.UNLOCK_NUM_PERCENT[1]) < $.trim(this.UNLOCK_NUM_PERCENT[0])) {
            window.toast('冻结条件分子不能大于冻结条件分母');
            return;

        }
        this.form.UNLOCK_NUM_PERCENT = this.UNLOCK_NUM_PERCENT[0] + '/' + this.UNLOCK_NUM_PERCENT[1]
        this.form.UID=this.condition.uid

        /*this.form.ASSETCODE=this.condition.assetCode*/
        this.form.UNLOCK=this.totalInfo.isenable;
        this.dongjiefrozenSvc.upDatePointsAllocateDict(this.form).then(data => {
            if (data.code == window.CODE.SUCCESS) {
                let arrays = null;
                this.timeStamp = arrays;
                this.form.LOCK_NUM_PERCENT = '';
                this.form.TRADE_COUNT_DAYS = '';
                this.form.USERID='';
                this.form.ASSETCODES='';
                this.UNLOCK_NUM_PERCENT[0]=this.timeStamp;
                this.UNLOCK_NUM_PERCENT[1]=this.timeStamp;
                this.dongjiefrozenSvc.saveDatePointsAllocateDict({keepeveryone:'LOCK'}).then(data=>{
                    if (data.code === window.CODE.SUCCESS) {
                    } else {
                        window.toast(data.msg);
                    }
                    console.log(data);
                })

                window.toast('修改成功');
                this.fetchList();

            } else {
                window.toast(data.msg);
            }

        })

    }
    updatesubmit(uid,dictStatus,assetCode,percentageFreezing,transactionTime,transactionTimes,percentageThaw1,percentageThaw2,fn) {

        if (uid === '') {
            window.toast('请输入用户UID');
            return;
        }
        if ($.trim(this.form.ASSETCODES) === '') {
            window.toast('请选择币种');
            return;
        }


        if (percentageFreezing === '') {
            window.toast('请输入冻结百分比');
            return;

        }
        if(dictStatus === 'UNLOCK') {
            if (transactionTime === '') {
                window.toast('请输入交易统计天数');
                return;

            }
        }
        if (percentageThaw1 === '') {
            window.toast('请输入冻结条件分子');
            return;
        }

        if (percentageThaw2 === '') {
            window.toast('请输入冻结条件分母');
            return;
        }

        if (percentageThaw2 < percentageThaw1) {
            window.toast('冻结条件分子不能大于冻结条件分母');
            return;

        }
        this.form.ASSETCODE=this.condition.assetCode
        this.form.UNLOCK_NUM_PERCENT = percentageThaw1 + '/' + percentageThaw2
        this.form.USERID=uid
        this.form.LOCK_NUM_PERCENT=percentageFreezing
        this.form.TRADE_COUNT_DAYS=transactionTime
        this.form.TRADE_COUNT_DAYS=transactionTimes
        /*this.form.ASSETCODE=this.condition.assetCode*/
        this.form.UNLOCK=this.totalInfo.isenable
        this.dongjiefrozenSvc.updateDatePointsAllocateDict(this.form).then(data => {
            if (data.code == window.CODE.SUCCESS) {
                fn();
                let arrays = null;
                this.timeStamp = arrays;
                this.form.LOCK_NUM_PERCENT = '';
                this.form.TRADE_COUNT_DAYS = '';
                this.form.USERID='';
                this.form.ASSETCODES='';
                this.UNLOCK_NUM_PERCENT[0]=this.timeStamp;
                this.UNLOCK_NUM_PERCENT[1]=this.timeStamp;
                this.dongjiefrozenSvc.saveDatePointsAllocateDict({keepeveryone:'LOCK'}).then(data=>{
                    if (data.code === window.CODE.SUCCESS) {
                    } else {
                        window.toast(data.msg);
                    }
                    console.log(data);
                })

                window.toast('修改成功');
                this.fetchList();

            } else {
                window.toast(data.msg);
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
        if (this.$scope.pageNo) {
            param.pageNo = this.$scope.pageNo
        }

        if (this.$scope.pageSize) {
            param.pageSize = this.$scope.pageSize
        }

        if (this.$scope.brokerId) {
            param.brokerId = this.$scope.brokerId;
        }
        if (this.$scope.assetCode) {
            param.assetCode = this.$scope.assetCode;
        }
        if (this.$scope.uid) {
            param.uid = this.$scope.uid;
        }
    }
    /**
     * 删除
     * */
    deleteAllocationProportion(id) {
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
    }
    showUserdict(id) {
        let that = this;
        let modalInstance = this.$uibModal.open({
            template: passwordUserdict,
            scope: this.$scope,
            controller() {}
        });
        this.dongjiefrozenSvc.getAllocationProportion({ID: id}).then(rep => {
            this.isLoading = false;

            if (rep.code === window.CODE.SUCCESS) {
                // console.log(JSON.parse(rep.data));
                that.data = rep.data;
                this.$scope.$$uid = that.data.uid
                this.$scope.$$assetCode = that.data.assetCode
                this.$scope.$$percentageFreezing = that.data.percentageFreezing
                this.form.TRADE_COUNT_TIME = that.data.transactionDay
                this.$scope.$$transactionTimes = that.data.transactionDay
                this.$scope.$$UNLOCK_NUM_PERCENTS[0] = that.data.percentageThaw1
                this.$scope.$$UNLOCK_NUM_PERCENTS[1] = that.data.percentageThaw2
                this.totalInfo.isenable= that.data.dictStatus
            } else {
                setTimeout(() => {
                    window.history.back()
                }, 1000)
                window.toast(rep.msg);
            }
        })
        this.$scope.$$ok = function (uid,dictStatus,assetCode,percentageFreezing,transactionTime,transactionTimes,percentageThaw1,percentageThaw2) {

            that.updatesubmit(uid,dictStatus,assetCode,percentageFreezing,transactionTime,transactionTimes,percentageThaw1,percentageThaw2,function () {
                modalInstance.dismiss('ok');
            })

        }
        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
            that.form.ASSETCODES='';
            that.fetchList();
        };
    }
    changeSymbol() {
        // console.log(this.condition.symbol)
    }
}


export default ListController;
