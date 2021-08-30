/**
 * author liubingli
 *
 */
export default class usersCompanyAccountSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    account(params) {
        return this.Api.post('/business/fund/businessFinanceList', params);
    }

}