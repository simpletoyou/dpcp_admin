const config = {
    PAGE_SIZE: 10,
}
// import coinConfig from '../../../common/coinConfig';
import MathTool from '../../../../common/mathTool'

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
        this.datas = [];
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;
        this.url='';
        this.$scope.status = [
            {label:'一级代理',value:'VIP1'},
            {label:'二级代理',value:'VIP2'},
            {label:'三级代理',value:'VIP3'},
        ]
        this.$scope.beginTime = '';
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

    //跳转详情
    detailss (uid,memberType,teamAllPerson){
        window.location.href='#/commonusers/team/performance/teamDetails?uid='+uid+'&'+'memberType='+memberType+'&'+'teamAllPerson='+teamAllPerson
        this.fetchList();
    }

    //返回
    backs (){
        window.history.back();
        let that=this;
        var t=setTimeout(function(){
            location.href;
            console.log(location.href.slice(-11))
            if(location.href.slice(-11) == 'performance'){
                return true
            }else{
                that.fetchList();
            }
        },200)
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

    //显示文字格式化
    statusText(name){
        switch(name){
            case "TRADE":
                return '交易奖励'
                break;
            case "REGISTER":
                return '注册奖励'
                break;
            case "LOTTERY":
                return '抽奖奖励'
                break;
            case "INVITE":
                return '邀请奖励'
                break;
        }
    }
    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        //let param = Object.assign({}, this.condition);
        // this.mergeSearch(param);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        //uid和等级
        this.datas=[];
        let url = window.location.href;
        let arrUrl=url.indexOf('?')+1;
        let str2=url.substr(arrUrl);
        let uList=str2.split('&');
        for(var i=0;i<uList.length;i++){
          let $url=uList[i].indexOf('=')+1;
          this.datas.push(uList[i].substr($url))
        }


        let param={uid:this.datas[0],member:this.datas[1],teamAllPerson:this.datas[2]};

        this.service.getTeamDetails(param).then(data=>{
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if(data.code == '100200'){
                this.list = data.data;
                let arr = []
                for(let i in data.data.assetCoinAndNum){
                    arr.push({name:i,val:data.data.assetCoinAndNum[i]})
                }
                this.list.assetCoinAndNum = arr;

                let arrs=[];
                for(let i in data.data.teamAssetTypeAndAllProfit){
                   arrs.push({name:i,val:data.data.teamAssetTypeAndAllProfit[i]})
                }
                this.list.teamAssetTypeAndAllProfit = arrs;
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
