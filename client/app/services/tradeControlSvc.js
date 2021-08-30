/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/28
 */

export default class tradeControlSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 查询列表
     * @param params
     */
    list(params = {}) {
        return this.Api.get('/managerAssetAndSymbol/configsymbol-list', params, null, false);
    }

    /**
     * C2C交易流水查询
     * @param params
     */
    transInfo(params = {}) {
        return this.Api.get('/transOrderController/transInfo', params, null, false);
    }


    /**
     * 创建新交易对
     * @param params
     * @param header
     */
    create(params = {}, header = {}) {
        return this.Api.post('/managerAssetAndSymbol/configsymbol-create', params, header, false);
    }

    /**
     * 修改交易对信息
     * @param params
     * @param header
     */
    updateConfigSymbol(params = {}, header = {}) {
        return this.Api.post('/managerAssetAndSymbol/configsymbol-update', params, header, false);
    }

    /**
     * 币种配置列表
     * @param params
     */
    profileList(params = {}) {
        return this.Api.get('/managerAssetAndSymbol/configsymbolprofile-list', params, null, false);
    }

    /**
     * 交易对设置开关  交易对添加   都用此接口
     * @param params
     * @returns {*}
     */
    update(params = {}, header = {}) {
        return this.Api.get('/managerAssetAndSymbol/configsymbolprofile-edit', params, header, false);
    }

    /**
     * 交易对设置排名
     * @param params
     * @returns {*}
     */
    updateUp(params = {}, header = {}) {
        return this.Api.get('/managerAssetAndSymbol/configsymbol-edit', params, header, false);
    }


    /**
     * 交易记录查询
     * @param params
     */
    fetchTradeRecord(params = {}, header = {}) {
        return this.Api.get('/match/orders-query', params, header, false);
    }

    /**
     * 国京交易记录查询
     * @param params
     */
    tradeGlideList(params = {}, header = {}) {
        return this.Api.get('/trade-glide/tradeGlideList', params, header, false);
    }


    /**
     * 国京绑定账户查询
     * @param params
     */
    selectAccountStates(params = {}, header = {}) {
        return this.Api.get('/accountwinmax/selectAccountStates', params, header, false);
    }


    /**
     * 国京冻结和解冻出入金功能
     * @param params
     */
    updateAccountStates(params = {}, header = {}) {
        return this.Api.get('/accountwinmax/updateAccountStates', params, header, false);
    }
    /**
     * 用户算力获得奖励流水
     * @param params
     */
    getAllRewardRecord(params = {}, header = {}) {
        return this.Api.get('/allocate-config/getAllRewardRecord', params, header, false);
    }
    /**
     * 用户算力获得奖励流水(IEP)
     * @param params
     */
    getAllRewardRecordIep(params = {}, header = {}) {
        return this.Api.get('/allocate-iep-record/getAllRewardRecord', params, header, false);
    }

}