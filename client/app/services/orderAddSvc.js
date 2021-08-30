/**
 * author liubingli
 *
 */
export default class orderAddSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    add(params) {
        return this.Api.post('/business/order/add', params);
    };

}