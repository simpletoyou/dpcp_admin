/**
 * Created by zhaojing on 2017/11/27.
 */



export default class rewarDetailSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }



    /**
     * 释放记录 分页查询
     * @param params
     * @returns {*}
     */
    selectTradeLockingRewarDetail(params = {}) {
        return this.Api.get('/userTradeLocking/selectTradeLockingRewarDetail', params);
    }

}