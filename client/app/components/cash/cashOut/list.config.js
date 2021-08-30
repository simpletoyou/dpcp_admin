/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/28
 */


export default {

    // 充值和提现类型
    TYPE_CASH_OUT: 'OUT',
    TYPE_CASH_IN: 'IN',

    // 提现状态
    STATUS_CASH_OUT_PROCESSING: {
        KEY: 'PROCESSING',
        TEXT: '进行中'
    },
    STATUS_CASH_OUT_WAIT: {
        KEY: 'WAIT',
        TEXT: '等待'
    },
    STATUS_CASH_OUT_SUCCESS: {
        KEY: 'SUCCESS',
        TEXT: '已成功'
    },
    STATUS_CASH_OUT_CANCEL: {
        KEY: 'CANCEL',
        TEXT: '已取消'
    },

    // 支付类型
    PAY_MODE_OFFLINE: {
        KEY: 'OFFLINE',
        TEXT: '线下'
    },
    PAY_MODE_SUPERPAY: {
        KEY: 'SUPERPAY',
        TEXT: '超级代付'
    },
    PAY_MODE_QDBPAY: {
        KEY: 'QDBPAY',
        TEXT: '钱袋宝代付'
    },
    PAY_MODE_ULPAY: {
        KEY: 'ULPAY',
        TEXT: '合众代付'
    }


}