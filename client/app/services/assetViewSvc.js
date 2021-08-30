/**
 * author gengmangmang
 *
 */
export default class assetViewSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    businessFinance(params) {
        return this.Api.get('/broker/asset/finances', params);
    };

    getOrderCount(params) {
        return this.Api.get('/broker/asset/orderCount', params);
    };

    getBrokerInfo(params){
        return this.Api.get('/broker/info',params);
    }

}