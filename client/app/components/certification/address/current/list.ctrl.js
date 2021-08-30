/**
 * author zhaojing
 */
class ListController {


    constructor($rootScope,$scope, securitySvc,$location) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.rootScope = $rootScope
        this.scope = $scope;
        this.$location = $location;
        this.service = securitySvc;

        this.list = null;
        this.isLoading = false;
        this.totalNum = 0;
        this.keyWord = 'uid';
        this.keyWordVal = '';

        this.condition = {
            "pageNo":1,
            "pageSize":10,
            "status":"INIT"
        };

        let that = this;

    }

    $onInit () {
        this.init();
    }
    /**
     * @return {null}
     */
    init() {
        // scrollTo(0,0);
        this.fetchList();

    }


    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        let param = Object.assign({}, this.condition);
        if(this.keyWord&&this.keyWordVal!=''){
            param[this.keyWord] = this.keyWordVal;
        }
        this.service.residenceAuthenticationList(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }

    gotoOpt(val,opt){
        this.rootScope.optionFlag = true;
        this.$location.url('/certification/address/detail?id='+val+'&opt='+opt);
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }


}

export default ListController;


