/**
 * author liubingli
 */
class BasicinfoController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope, basicInfoSVC, enumSvc, commonSvc) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.scope = $scope;
        this.basicInfoSvc = basicInfoSVC;
        this.enumSvc = enumSvc;
        this.commonSvc = commonSvc;

        this.user = null;

        this.isLoading = true;

        this.init();

    }

    init() {
        this.fetchList();
    }

    fetchList() {
        this.isLoading = true;
        this.basicInfoSvc.userInfo({
            uid: this.uid
        }).then(rep => {
            this.isLoading = false;
            if(rep.code === window.CODE.SUCCESS){
                this.user = rep.data;
            }else{
                window.toast(rep.msg);
            }
        })
    }


}

export default BasicinfoController;