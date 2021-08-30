/**
 * author zhaojing
 */
class ListController {

    constructor($scope, financeCheckSvc, commonSvc) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.scope = $scope;
        this.service = financeCheckSvc;
        this.commonSvc = commonSvc;

        this.list = null;
        // this.config = config;
        this.isLoading = false;
        // this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        // this.type = config.STATUS_CASH_IN_ALL.KEY;

        // this.$scope.keyWord = config.TYPE_SCREEN_CASH_IN_ID.KEY;
        // this.$scope.keyWordText = null;

        this.condition = {
            "pageNo":1,
            "pageSize":10,
            "assetType":"CNY"
        };
        this.init();

    }

    /**
     * @return {null}
     */
    init() {
        this.fetchList();
    }


    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        let param = Object.assign({}, this.condition);
        /*if (this.$scope.keyWordText) {
            param[this.$scope.keyWord] = this.$scope.keyWordText;
        }*/

        this.service.checkBalanceList(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                // this.list = rep.data.list;
                // let i = 0;
                // let map = {};
                // let batchVersion = [];
                // for(i=0;i<list.length;i++){
                //     let temp = list[i];
                //     if (map[temp.batchVersion]) {
                //         map[temp.batchVersion].initBalance += temp.initBalance;
                //         map[temp.batchVersion].endBalance += temp.endBalance;
                //         map[temp.batchVersion].fixAmount += temp.fixAmount;
                //         map[temp.batchVersion].fixBalance += temp.fixBalance;
                //     } else {
                //         map[temp.batchVersion] = {
                //             initBalance: temp.initBalance,
                //             endBalance: temp.endBalance,
                //             fixAmount: temp.fixAmount,
                //             fixBalance: temp.fixBalance
                //         };
                //     }




                    // let j = 0;
                    // let flag = true;
                    // for(j=0;j<batchVersion.length;j++){
                    //     if(batchVersion[j].batchVersion==list[i].batchVersion){
                    //         batchVersion[j].initBalance +=  list[i].initBalance
                    //         batchVersion[j].endBalance +=  list[i].endBalance
                    //         batchVersion[j].fixAmount += list[i].fixAmount
                    //         batchVersion[j].fixBalance += list[i].fixBalance
                    //         flag = false;
                    //         break;
                    //     }
                    // }
                    // if(flag){
                    //     batchVersion.push(list[i]);
                    // }

                //}
                //this.list = list;//batchVersion;
                this.totalNum = rep.data.totalNum;


            } else {
                this.list = [];
                window.toast(rep.msg);
            }
        })
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }


}

export default ListController;


