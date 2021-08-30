/**
 * author gengmangmang
 *
 */
export default class companySvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    businessInfo(params) {
        return this.Api.post('/business/info/businessInfo', params);
    };
}