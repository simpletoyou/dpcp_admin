/**
 * author liubingli
 *
 */
export default class basicInfoSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    userInfo(params) {
        return this.Api.get('/user/user-info', params);
    }

    //冻结单条交易或者提现
    createUpCurrencyFreezing(params) {
        return this.Api.get('/Currency/Freezing/createUpCurrencyFreezing', params);
    }

    // 冻结或者解冻全部币种，提现
    //冻结单条交易或者提现
    updateByStatus(params, header) {
        return this.Api.get('/user/freezing/updateByStatus', params, header);
    }

    //矿机赠送IEP
    giftFinanceIEP(params, header) {
        return this.Api.get('/admin/giftFinanceIEP', params, header);
    }

}