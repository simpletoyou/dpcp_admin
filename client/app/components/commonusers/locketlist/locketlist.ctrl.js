/**
 * author liubingli
 */
class CommonusersController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope, commonusersSvc, enumSvc, commonSvc, $location) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.$scope = $scope;
        this.commonusersSvc = commonusersSvc;
        this.enumSvc = enumSvc;
        this.commonSvc = commonSvc;
        this.options = {};
        this.$location = $location;

        this.$scope.keyWord = 'uid';
        this.$scope.keyWordText = '';

        this.list = null;

        this.isLoading = true;

        this.condition = {
            pageNo: 1,
            pageSize: 30
        };

        this.totalNum = 0;

        this.init();

    }

    /**
     * @return {null}
     */
    init() {
        this.fetchList();
    }

    fetchList() {

        let param = Object.assign({}, this.condition);
        if (this.$scope.keyWordText) {
            param[this.$scope.keyWord] = this.$scope.keyWordText.replace('.','\.');
        }

        this.isLoading = true;
        this.commonusersSvc.commonusers(param).then(rep => {
            this.isLoading = false;
            if(rep.code===window.CODE.SUCCESS){
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            }else{
                window.toast(rep.msg);
            }
        });

    }

    pageChanged() {
        this.fetchList();
    }

    searchInfo(data) {
        this.userid = data;
        this.$location.url('/commonusers/personalinfo?uid=' + this.userid);
    }


}

export default CommonusersController;