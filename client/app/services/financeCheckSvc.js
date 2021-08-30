export default class cashSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 获取对账余额列表
     * {
            "pageNo":1,
            "pageSize":10,
            "assetType":"CNY"
        }
     * @returns {*}
     *
     */
    checkBalanceList(params = {}) {
        return this.Api.post('/financeCheck/checkBalanceList', params, null, true);
    }



    /**
     * 获取对账批次列表
     * {
            "pageNo":1,
            "pageSize":10,
            "assetType":"CNY"
        }
     * @returns {*}
     */
    checkBatchList(params = {}) {
        return this.Api.post('/financeCheck/checkBatchList', params, null, true);
    }

    /**
     * 当前/历史差错列表
     * {
            "pageNo":1,
            "pageSize":10,
            "status":"INIT",
            "assetType":"CNY"
        }
     * @returns {*}
     */
    checkMismatchList(params = {}) {
        return this.Api.post('/financeCheck/checkMismatchList', params, null, true);
    }


    /**
     * 重新匹配接口
     * {
            "txNo"：差错流水号，
            "uid"：操作员id，
            "pwd":操作员密码
            "transferType"：类型IN/OUT，
            "assetType"：资产类型，
            "accountType"：账户类型
        }
     * @returns {*}
     */
    rematch(params = {}) {
        return this.Api.post('/financeCheck/fix/rematch', params, null, true);
    }


    /**
     * 坏账处理
     * {
            "txNo"：差错流水号，
            "uid"：操作员id，
            "pwd":操作员密码，
            "remark"：备注，
            "amount":金额
        }
     * @returns {*}
     */
    recordBadFinance(params = {}) {
        return this.Api.post('/financeCheck/fix/recordBadFinance', params, null, true);
    }


    /**
     * 差错处理
     * {
            "txNo"：差错流水号，
            "uid"：操作员id，
            "pwd":操作员密码
            "changeType"：变更类型(ADD, REDUCE)
            "remark"：备注，
            "amount"：金额
        }
     * @returns {*}
     */
    rebalanceAsset(params = {}) {
        return this.Api.post('/financeCheck/fix/rebalanceAsset', params, null, true);
    }



    /**
     * 人工打款
     * {
            "txNo"：差错流水号，
            "uid"：操作员id，
            "pwd":操作员密码
            "remark"：备注，
            "amount":金额，
            "serNum":流水号,
            "payAccount":支付账号,
            "recvAccount":收款账号
        }
     * @returns {*}
     */
    manualPlay(params = {}) {
        return this.Api.post('/financeCheck/fix/manualPay', params, null, true);
    }


    /**
     * 人工退款
     * {
            "txNo"：差错流水号，
            "uid"：操作员id，
            "pwd":操作员密码
            "remark"：备注，
            "amount":金额，
            "serNum":流水号,
            "payAccount":支付账号,
            "recvAccount":收款账号
        }
     * @returns {*}
     */
    manualRefund(params = {}) {
        return this.Api.post('/financeCheck/fix/manualRefund', params, null, true);
    }


    /**
     * 差错修复列表
     * {
            "txNo"：差错流水号，
            "uid"：操作员id，
            "pwd":操作员密码
            "remark"：备注，
            "amount":金额，
            "serNum":流水号,
            "payAccount":支付账号,
            "recvAccount":收款账号
        }
     * @returns {*}
     */
    fixMismatchList(params = {}) {
        return this.Api.post('/financeCheck/fixMismatchList', params, null, true);
    }

}
