/**
 * author liubingli
 *
 */
export default class refundListSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    list(params) {
        return this.Api.get('/business/refund/list', params);
    }

    reject(params) {
        return this.Api.post('/business/reject', params);
    }

    fromSelectDataGet(params) {
        return this.Api.get('/business/from', params);
    }

}