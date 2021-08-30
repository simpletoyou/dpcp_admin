export default class confirmGopSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    confirmGop(params) {
        return this.Api.post('/business/coin/confirmGop', params);
    };

}