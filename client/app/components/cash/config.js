/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/28
 */


export default {

    STATUS_TOP: {
        KEY: 'YES'
    },
    STATUS_NOT_TOP: {
        KEY: 'NO'
    },


    PAGE_SIZE: 30,

    // 充值和提现类型
    TYPE_CASH_OUT: 'OUT',   // 提现
    TYPE_CASH_IN: 'IN',     // 充值

    TYPE_OPER_RIGHT: 'RIGHT',   // 确认提现
    TYPE_OPER_WRONG: 'WRONG',   // 退款
    TYPE_OPER_CANCEL: 'CANCEL',   // 撤销

    TYPE_OPER_OKPAY: 'OKPAY',

    // 提现状态
    STATUS_CASH_OUT_PROCESSING: {
        KEY: 'PROCESSING',
        TEXT: '进行中'
    },
    STATUS_CASH_OUT_WAIT: {
        KEY: 'WAIT',
        TEXT: '等待'
    },
    STATUS_CASH_OUT_UNKNOWN: {
        KEY: 'UNKNOWN',
        TEXT: '待确认'
    },
    STATUS_CASH_OUT_SUCCESS: {
        KEY: 'SUCCESS',
        TEXT: '已成功'
    },
    STATUS_CASH_OUT_CANCEL: {
        KEY: 'CANCEL',
        TEXT: '已取消'
    },
    STATUS_CASH_OUT_FAILURE: {
        KEY: 'FAILURE',
        TEXT: '已退款'
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
    },
    PAY_MODE_OKPAY: {
        KEY: 'OKPAY',
        TEXT: 'okpay代付'
    },

    //cashin 条件筛选字段
    TYPE_SCREEN_CASH_IN_ID:{
        KEY:'id',
        TEXT:'ID'
    },

    // 充值状态

    STATUS_CASH_IN_WAIT: {
        KEY: 'WAIT',
        TEXT: '进行中'
    },
    STATUS_CASH_IN_SUCCESS: {
        KEY: 'SUCCESS',
        TEXT: '已完成'
    },
    STATUS_CASH_IN_CANCEL: {
        KEY: 'CANCEL',
        TEXT: '已取消'
    },
    STATUS_CASH_IN_ALL: {
        KEY: 'ALL',
        TEXT: '显示全部'
    }
}