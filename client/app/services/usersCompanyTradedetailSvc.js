/**
 * author liubingli
 *
 */
export default class usersCompanyTradedetailSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    tradedetail(params) {
        return this.Api.get('/match/trades', params);
    }

}