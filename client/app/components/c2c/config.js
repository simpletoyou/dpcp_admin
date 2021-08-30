/**
 * @file
 * @author jinguangguo
 * @date 2017/10/12
 */

export default {

    TRANSACTION_KEY: 'ASSETFEERATE',        // 交易手续费

    WITHDRAW_TYPE_FEE: 'WITHDRAWMINFEE',        // 提币手续费
    WITHDRAW_TYPE_MIN: 'WITHDRAWMIN',
    WITHDRAW_TYPE_MAX: 'WITHDRAWMAX',

    WITHDRAWLEVEL_0:'WITHDRAWLEVEL_0',
    WITHDRAWLEVEL_1:'WITHDRAWLEVEL_1',
    WITHDRAWLEVEL_2:'WITHDRAWLEVEL_2',
    WITHDRAWLEVEL_3:'WITHDRAWLEVEL_3',


    TRANS_STATUS:{
        UNPAY:'未付款',
        PAID:'已付款',
        COMPLAINNING:'申诉中',
        FINISHED:'交易完成',
        CANCELED:'交易取消',
        CLOSED:'交易关闭',
        OVERTIME:'交易超时'
    },

    PAY_TYPE:{
        ALIPAY:'支付宝',
        BANK:'银行卡'
    },

    TRADE_TYPE:{
        BUY:'买方申诉',
        SELL:'卖方申诉'
    },
};