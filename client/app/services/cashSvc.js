export default class cashSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * USD美元充值列表
     * @param params
     * @returns {*}
     */
    depositCurrencyList(params = {}) {
        return this.Api.get('/currency/deposit/orders', params);
    }

    /**
     * 充值确认
     * @param params
     * @param header
     * @returns {*}
     */
    confirmDepositTransfer(params = {}, header = {}) {
        return this.Api.get('/currency/deposit/order/confirm', params, header);
    }

    /**
     * 提现确认
     * @param params
     * @param header
     * @returns {*}
     */
    confirmWithdrawTransfer(params = {}, header = {}) {
        return this.Api.get('/currency/withdraw/confirm', params, header);
    }

    /**
     * 人民币充值/提现撤销
     * @param params
     * @param header
     * @returns {*}
     */
    cancelTransfer(params = {}, header = {}) {
        return this.Api.get('/currency/withdraw/cancel', params, header);
    }

    /**
     * USD美元提现列表
     * @param params
     * @returns {*}
     */
    withdrawCurrencyList(params = {}) {
        return this.Api.get('/currency/withdraw/orders', params);
    }

    /**
     * 提现锁定
     * @param params
     * @returns {*}
     */
    lockTransfer(params = {}) {
        return this.Api.get('/currency/withdraw/lock', params);
    }

    /**
     * 提现解锁
     * @param params
     * @returns {*}
     */
    unlockTransfer(params = {}) {
        return this.Api.get('/currency/withdraw/unlock', params);
    }

    /**
     * 退款
     * @param params
     * @param header
     * @returns {*}
     */
    refundTransfer(params = {}, header = {}) {
        return this.Api.get('/currency/withdraw/refund', params, header);
    }

    /**
     * 支付
     * @param params
     * @param header
     * @returns {*}
     */
    pay(params = {}, header = {}) {
        return this.Api.get('/currency/withdraw/pay', params, header);
    }

}
