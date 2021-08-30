export default class lockCoinSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    financeList(params) {
        return this.Api.get('/finance/financeUserList', params);
    };

    financeExcel(params) {
        return this.Api.get('/finance/FinanceExcel', params);
    };



}
