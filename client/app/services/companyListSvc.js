/**
 * author gengmangmang
 *
 */
export default class companyListSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    businessList(params) {
        return this.Api.get('/broker/infos', params);
    };
}