/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/16
 */

export default class {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 列表
     * @param params
     * @param headers
     * @returns {*}
     */
    login(params = {}, headers = {}) {
        return this.Api.get('/admin/login', params, headers);
    }

}