/**
 * author gengmangmang
 *
 */
export default class rmbManageSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    listInfo(params) {
        return this.Api.get('/broker/asset/finance/details', params);
    };

    transferInfo(params) {
        return this.Api.post('/business/fund/transfer', params);
    }

    /**
     * 新增 获取账户资产
     * */
    businessFinance(params) {
        return this.Api.get('/broker/asset/finances', params);
    };

    /**
     * 给账户加钱
     * */
    brokerDeposit(params,header={}) {
        return this.Api.get('/broker/asset/deposit', params,header);
    };

    /*
     * 给账户减钱
     * */
    brokerWithdraw(params,header={}) {
        return this.Api.get('/broker/asset/withdraw', params,header);
    };
}