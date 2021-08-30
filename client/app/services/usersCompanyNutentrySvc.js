/**
 * author liubingli
 *
 */
export default class usersCompanyNutentrySvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    nutentry(params) {
        return this.Api.post('/business/coin/transferList', params);
    }

    confirm(params) {
        return this.Api.post('/business/coin/confirmGop', params);
    }

}