/**
 * Created by zhaojing on 2017/11/27.
 */



export default class InnovationSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }



    /**
     * 解锁统计
     * @param params
     * @returns {*}
     */
    totalUnlock(params = {}) {
        return this.Api.get('/userActivityTotal/totalUnlock', params);
    }
     /**
     * 手续费分红
     * @param params
     * @returns {*}
     */
    totalFeeReturn() {
        return this.Api.get('/userActivityTotal/totalFeeReturn');
    }

}