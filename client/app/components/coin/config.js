
export default {
    PAGE_SIZE: 30,

    TYPE_GOP_IN:'IN',
    TYPE_GOP_OUT:'OUT',

    STATUS_WAITING:{
        KEY:'WAITING',
        VALUE:'待审核'
    },

    TRANSACTION_KEY: 'ASSETFEERATE',        // 交易手续费
    ASSETFEERATE: 'ASSETFEERATE',
    PRICEPRECISION: 'PRICEPRECISION',
    AMOUNTPRECISION: 'AMOUNTPRECISION',
    HIGHLIGHTNO: 'HIGHLIGHTNO',

    SHOWSTATUS: 'SHOWSTATUS',

    WITHDRAW_TYPE_FEE: 'WITHDRAWMINFEE',        // 提币手续费
    WITHDRAW_TYPE_MIN: 'WITHDRAWMIN',
    WITHDRAW_TYPE_MAX: 'WITHDRAWMAX',

    WITHDRAWMINFEE: 'WITHDRAWMINFEE',
    WITHDRAWMIN: 'WITHDRAWMIN',
    WITHDRAWMAX: 'WITHDRAWMAX',


    WITHDRAWLEVEL_0: 'WITHDRAWLEVEL_0',
    WITHDRAWLEVEL_1: 'WITHDRAWLEVEL_1',
    WITHDRAWLEVEL_2: 'WITHDRAWLEVEL_2',
    WITHDRAWLEVEL_3: 'WITHDRAWLEVEL_3',

    DEPOSITLEVEL_DEFAULT: 'DEPOSITLEVEL_DEFAULT',    // 充值开关，0：开启，-1：关闭
    WITHDRAWPRECISION: 'WITHDRAWPRECISION',   // 提现（钱包）精度
    ASSETCODECONFIRMNUM: 'ASSETCODECONFIRMNUM',  // 网络确认数

    //操作类型
    OPT_TYPE_ADOPT:{
        KEY:'ADOPT',
        VALUE:'同意'
    },
    OPT_TYPE_REFUSE:{
        KEY:'REFUSE',
        VALUE:'拒绝'
    },
    // 拒绝选项
    REFUSE_OPTIONS: [
        {
            VALUE: '',
            LABEL: '请选择'
        },
        {
            VALUE: '10001',
            LABEL: '理由1'
        },
        {
            VALUE: '10002',
            LABEL: '理由2'
        },
        {
            VALUE: '10003',
            LABEL: '理由3'
        },
        {
            VALUE: '30000',
            LABEL: '其他理由'
        }
    ],
    STATUS_OPTIONS: [ // 提现审核的选项
        {
            VALUE: 'PROCESSED',
            LABEL: '全部',
        },
        {
            VALUE: 'PROCESSING',
            LABEL: '进行中',
        },
        {
            VALUE: 'SUCCESS',
            LABEL: '已到账',
        },
        {
            VALUE: 'REFUSE',
            LABEL: '已拒绝',
        },
        {
            VALUE: 'FAILURE',
            LABEL: '失败',
        },
    ]

}
