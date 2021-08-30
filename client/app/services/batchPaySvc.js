/**
 * author gengmangmang
 *
 */
export default class batchPaySvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    cnyTransferList(params) {
        return this.Api.post('/business/currency/transferList', params);
    };

    cnyLock(params) {
        return this.Api.post('/business/currency/lock', params);
    }

    cnyUnlock(params) {
        return this.Api.post('/business/currency/unlock', params);
    };

    cnyConfirm(params) {
        return this.Api.post('/business/currency/confirm', params);
    };

    cnyReject(params) {
        return this.Api.post('/business/currency/reject', params);
    };

    cnyCibPay(params) {
        return this.Api.post('/business/currency/cibPay', params);
    };

    cnyQdbPay(params) {
        return this.Api.post('/business/currency/qdbPay', params);
    };

    /**
     * 合众
     * @param params
     * @returns {*}
     */
    cnyUlPay(params) {
        return this.Api.post('/business/currency/ulPay', params);
    };
}
