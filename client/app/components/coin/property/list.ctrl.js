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
    constructor($scope, propertySvc, $uibModal, $location, $state) {
        "ngInject";

        this.$scope = $scope;
        this.service = propertySvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$scope.coinList = $scope.$root.$coinList;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;
        // 搜索选项
        this.$scope.uid = '';
        // this.$scope.coinType = $state.params.type.toUpperCase();
        // 结束时间最小值
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;

        this.$scope.coinList = $scope.$root.$coinList;
        this.condition = {
            assetCode: this.$scope.coinList[0].value,
            pageNo: 1,
            pageSize: config.PAGE_SIZE
        };

        // this.$scope.coinType = $state.params.type.toUpperCase();




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

    changeSymbol(){
        this.fetchList();
    }



    /**
     * 获取列表
     * 带参数的搜索
     */




    fetchList() {
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        // let timeStamp = new Date().valueOf();
        // this.timeStamp = timeStamp;
        // let param = {
        //     assetCode:'UDC'
        // }
        this.service.financeList(param).then(rep => {
            this.isLoading = false;
            this.list=rep.data.list;
           //总页数
            this.totalNum=rep.data.pageNum * rep.data.pageSize;
            // this.condition.pageNo=rep.data.pageNo
            // this.condition.pageSize=rep.data.pageSize
        })
    }

    //导出数据
    download() {
        let param = Object.assign({}, this.condition);
        this.mergeSearch(param);
        let url = window.location.href;
        if(url.indexOf('manager.smt-ex.com') >-1){
            this.$scope.url = '//manager.smt-ex.com'
        }else if(url.indexOf('http://manager.smt-ex.com/')>-1){
            this.$scope.url = '//http://manager.smt-ex.com/'
        }
        this.urlParam = []
        for (let i in param) {
            this.urlParam.push({
                key: i,
                value: param[i]
            })
        }
        // return false;
        setTimeout(() => {
            $('#download').click()
        }, 500)
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
        //如果存在就加上
        if (this.$scope.uid) {
            param.uid = this.$scope.uid
        }
    }
}


export default ListController;
