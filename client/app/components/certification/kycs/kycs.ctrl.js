/**
 * author zhaojing
 */
class OrderController {

    constructor($scope, commonSvc, $location) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.scope = $scope;
        this.commonSvc = commonSvc;
        this.$location = $location;
        this.init();

    }

    /**
     * @return {null}
     */
    init() {
        // this.selectedBtn = window.location.href.indexOf('commonusers/kycs/verify') >= 0 ? 'verify' : window.location.href.indexOf('commonusers/kycs/address') ? 'address' : 'history';
        this.keyWord = 'uid';
        this.keyWordVal = '';
        let url = this.$location.url();
        if (url.indexOf('verify') > -1) {
            this.selectedBtn = 'verify';
        } else if (url.indexOf('address') > -1) {
            this.selectedBtn = 'address';
        } else {
            this.selectedBtn = 'history';
        }
    }
    toggleTab(val) {
        this.keyWordVal = '';
        this.selectedBtn = val;
        // this.$location.path('/certification/kycs/'+val)
    }
}

export default OrderController;