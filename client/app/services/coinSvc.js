
export default class coinSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 虚拟币转入查询
     * @param params
     * @returns {*}
     */
    getCoinDepositList(params = {}) {
        return this.Api.get('/deposit/coin/transfer', params);
    }

    /**
     * 虚拟币转出查询
     * @param params
     * @returns {*}
     */
    getCoinWithdrawList(params = {}) {
        return this.Api.get('/withdraw/coin/transfer', params);
    }
    /**
     * 已处理虚拟币转出查询
     * @param params
     * @returns {*}
     */
    getProcessedCoinWithdrawList(params = {}) {
        return this.Api.get('/withdraw/coin/processed-query', params);
    }
    /**
     * 未处理虚拟币转出查询
     * @param params
     * @returns {*}
     */
    getUnProcessedCoinWithdrawList(params = {}) {
        return this.Api.get('/withdraw/coin/untreated', params);
    }

    /**
     * 审核通过
     * @param params
     * @param header
     * @returns {*}
     */
    coinConfirm(params = {}, header = {}) {
        return this.Api.get('/withdraw/coin/confirm', params, header);
    }

    /**
     * 获取手续费
     * @param params
     * @param header
     * @returns {*}
     */
    getFees(params = {}) {
        return this.Api.get('/withdraw/coin/withdrawalFeeSum', params);
    }
    

    /**
     * 果仁转入转出查询
     * @param params
     * @returns {*}
     */
    transferGop(params = {}) {
        return this.Api.get('/coin/transfer', params);
    }

    /**
     * 果仁挂单查询
     * @param params
     * @returns {*}
     */
    trade(params = {}) {
        return this.Api.get('/match/trades', params);
    }

    /**
     * 果仁成交查询
     * @param params
     * @returns {*}
     */
    order(params = {}) {
        return this.Api.get('/match/orders', params);
    }


    /**
     * 强制撤单
     * */
    /**
     * 撤销单子
     * @param param
     * @returns {*}
     */
    tradeCoinCancelByid(params = {},header = {}) {
        return this.Api.get('/match/match-order/cancel',params,header);
    }
}
