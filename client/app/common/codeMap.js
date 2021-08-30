/**
 * @file
 * @auth jinguangguo
 * @date 2017/1/22
 */

let CODE = {

    SUCCESS: '100200',

    // 接口通用错误
    REQUEST_ERROR: {
        CODE: '100100',
        CH: '传入字段校验错误',
        EN: 'Invalid request'
    },
    SERVER_ERROR: {
        CODE: '100101',
        CH: '服务不可用，飞天了',
        EN: 'Server Error'
    },
    NO_LOGIN: {
        CODE: '105101',
        CH: '未登录',
        EN: 'No Login'
    },

    
    EXIT_ALIPAY: {
        CODE: '113100',
        CH: '支付宝账号已经存在'
    },
    EXTI_BANK: {
        CODE: '113101',
        CH: '银行卡已经绑定'
    },
    EXIT_GOP_ADDRESS: {
        CODE: '113102',
        CH: '果仁地址已经存在',
        EN: 'This gop address has already existed'
    },
    INVALID_GOP_ADDREESS: {
        CODE: '113103',
        CH: '果仁地址格式错误',
        EN: 'Invalid gop address'
    },
    EXIT_OKPAY: {
        CODE: '113104',
        CH: 'OkPay账号已经存在',
        EN: 'This OKPAY account has already existed'
    },


    NO_PERMISSION: {
        CODE: '105102',
        CH: '账户没有权限',
        EN: 'No permission'
    },
    ACCOUNT_LOCK: {
        CODE: '105100',
        CH: '帐号已经锁定，请<a href="./reset.html">重置您的登录密码</a>',
        EN: 'Your account has been locked. <a href="./reset.html">Please reset your login password</a>'
    },


    CAPTCHA: {
        CODE: '109102',
        CH: '图形验证码错误，请重新输入',
        EN: 'Incorrect captcha. Please retry'
    },

    PHONE: {
        CODE: '104106',
        CH: '请输入正确的手机号码',
        EN: 'Incorrect cellphone number format'
    },
    PHONE_NOT_SUPPORT: {
        CODE: '104107',
        CH: '手机号不支持',
        EN: 'This cellphone number is not supported'
    },


    EMAIL: {
        CODE: '104112',
        CH: '邮箱格式错误，请重新输入',
        EN: 'Please enter the correct email address'
    },
    IDENTIFY: {
        CODE: '109100',
        CH: '请输入正确的短信验证码',
        EN: 'Please enter the correct verification code'
    },
    // IDENTIFY_EMAIL: {
    //     CODE: 109101,
    //     CH: '请输入正确的邮箱验证码',
    //     EN: 'Please enter the correct email address'
    // },
    IDENTIFY_HAS_SEND: {
        CODE: '109103',
        CH: '验证码已发送',
        EN: 'An E-mail containing your verification code has been sent'
    },


    LOGIN_PWD: {
        CODE: '104103',
        CH: '手机号或密码错误，请重新输入',
        EN: 'Please enter correct email address or password'
    },
    LOGIN_PWD_FORMAT: {
        CODE: '104104',
        CH: '手机号或密码错误，请重新输入',
        EN: 'Please enter correct email address or password'
    },
    LOGIN_PWD_NOT_EQUAL: {
        CODE: '104105',
        CH: '密码输入不一致',
        EN: `Password confirmation doesn't match Password`
    },
    // 在修改登录密码时使用
    LOGIN_PWD_ORIGIN: {
        CODE: '104114',
        CH: '原登录密码错误',
        EN: 'Incorrect origin login password'
    },


    HAS_NO_REGISTER: {
        CODE: '104102',
        CH: '手机号尚未注册，<a href="./register.html">立即注册</a>',
        EN: 'This email address has been signed up. Please change another one'
    },
    HAS_REGISTER: {
        CODE: '104100',
        CH: '手机号已注册，请重新输入'
    },


    NO_AUTH: {
        CODE: '104109',
        CH: '未实名认证',
        EN: ''
    },
    AUTH_ERROR: {
        CODE: '104110',
        CH: '实名认证不匹配',
        EN: 'Incorrect verification information'
    },


    PAY_PWD: {
        CODE: '104108',
        CH: '支付密码错误',
        EN: 'Please enter correct asset password'
    },
    PAY_PWD_FORMAT: {
        CODE: '104113',
        CH: '支付密码格式错误',
        EN: 'Please enter correct asset password'
    },
    PAY_PWD_LOCK: {
        CODE: '105103',
        CH: '为保证资金安全，您的支付密码已被锁定，请重置支付密码',
        EN: 'Your asset password has been locked. Please reset your asset password'
    },

    /*
     身份证错误 104111
     果仁不足 107100
     货币不足 107101
     每日转出金额操过限制 107102
     单笔最大转出金额 107103
     单笔最少转入金额 107104
     */
    ID_CARD_ERROR: {
        CODE: '104111',
        CH: '身份证错误',
        EN: 'Incorrect ID card number'
    },

    GOP_NUM_NOT_ENOUGH: {
        CODE: '107100',
        CH: '您的账户果仁不足',
        EN: 'Failed. Insufficient Balance.'
    },

    /*
     挂单超出最高挂单金额 101100: 提示信息具体内容由后端控制
     挂单低于挂单金额 101101: 提示信息具体内容由后端控制
     */
    LIMIT_BUY: {
        CODE: '101100',
        CH: '挂单超出最高挂单金额: xxxx',
        EN: ''
    },

    LIMIT_SELL: {
        CODE: '101101',
        CH: '挂单低于挂单金额: xxxx',
        EN: ''

    },

    /*
     该单已经撮合成功 102100
     该单已经取消 102101
     */
    ORDER_BIND_HAS_SUCCESS: {
        CODE: '102100',
        CH: '该单已经撮合成功',
        EN: ''
    },
    ORDER_CANCEL: {
        CODE: '102101',
        CH: '该单已经撤单',
        EN: ''
    },

    /*
     充值与提现相关——

     货币不足 107101
     每日转出金额操过限制 107102
     单笔最大转出金额 107103
     单笔最少转入金额 107104
     */
    CURRENCY_NOT_ENOUGH: {
        CODE: '107101',
        CH: '货币不足',
        EN: 'Insufficient balance'
    },
    GOP_NOT_ENOUGH: {
        CODE: '107100',
        CH: '果仁不足',
        EN: 'Insufficient balance'
    },
    LIMIT_DRAWOUT_MAX: {
        CODE: '107102',
        CH: '每日转出金额不能超过50000.00元',
        EN: 'USD withdrawal amount can’t be more than $50000 per day'
    },
    LIMIT_ONE_DRAWOUT_MAX_CURRENCY: {
        CODE: '107103',
        CH: '单笔转出最高50000.00元',
        EN: 'USD withdrawal amount can’t be more than $50,000 at one time'
    },
    LIMIT_ONE_DRAWOUT_MIN_CURRENCY: {
        CODE: '107104',
        CH: '单笔最低转出金额为10元',
        EN: 'USD withdrawal amount can’t be less than $10 at one time'
    },
    LIMIT_ONE_DRAWOUT_MAX_GOP: {
        CODE: '107105',
        CH: '单笔转出最高50000.00元',
        EN: 'USD withdrawal amount can’t be more than $50,000 at one time'
    },
    LIMIT_ONE_DRAWOUT_MIN_GOP: {
        CODE: '107106',
        CH: '单笔最低转出金额为10元',
        EN: 'USD withdrawal amount can’t be less than $10 at one time'
    },


    LIMIT_ONE_RECHARGE_MAX: {
        CODE: '106101',
        CH: '单笔最高转入金额为50000元',
        EN: 'USD deposit amount can’t be more than $50000 at one time'
    },
    LIMIT_ONE_RECHARGE_MIN: {
        CODE: '106100',
        CH: '单笔最少转入金额为100元',
        EN: 'USD deposit amount can’t be less than $100 at one time'
    },

    // 涨停熔断 - 这些提示由后端进行控制
    // MARKET_PRICE_UP_ERROR: {
    //     CODE: 101109,
    //     CH: '涨停触发了熔断机制，暂停交易',
    //     EN: 'Surged limit triggered circuit breaker mechanism to halt the market'
    // },
    // MARKET_PRICE_DOWN_ERROR: {
    //     CODE: 101111,
    //     CH: '跌停触发了熔断机制，暂停交易',
    //     EN: 'Decline limit triggered circuit breaker mechanism to halt the market'
    // },
    // LIMIT_PRICE_MIN: {
    //     CODE: 101110,
    //     CH: '当前最低卖出挂单价格'
    // }
    /*
     暂时不用
     101113 市价挂单最大金额
     101112 市价挂单最小金额
     */


    /**
     * 后台控制中心错误码
     * */
    BANK_RECHARGE_NOT_EXIST:{
        CODE:'106102',
        CH:'充值订单不存在（银行的账单）',
        EN:'BANK_RECHARGE_NOT_EXIST'
    },

    RECHARGE_ORDER_HAS_MATCHED:{
        CODE:'106103',
        CH:'充值订单已经匹配',
        EN:'RECHARGE_ORDER_HAS_MATCHED'
    },

    USER_RECHARGE_NOT_EXIST:{
        CODE:'106104',
        CH:'用户充值单不存在',
        EN:'USER_RECHARGE_NOT_EXIST'
    },

    USER_RECHARGE_LINKED:{
        CODE:'106105',
        CH:'用户充值单已经关联',
        EN:'USER_RECHARGE_LINKED'
    },

    MATCH_STATUS_ERROR:{
        CODE:'106106',
        CH:'匹配状态错误',
        EN:'MATCH_STATUS_ERROR'
    },

    MATCH_NOT_EXIST:{
        CODE:'106107',
        CH:'匹配记录不存在',
        EN:'MATCH_NOT_EXIST'
    },

    RECHARGE_HAS_CONFIRMED:{
        CODE:'106108',
        CH:'充值订单已匹配确认',
        EN:'RECHARGE_HAS_CONFIRMED'
    },

    INSUFFICIENT_BALANCE:{
        CODE:'114101',
        CH:'余额不足',
        EN:'Insufficient Balance'
    },

    HAS_TOP_NOTICE: {
        CODE: '118001',
        CH: '已有置顶公告',
        EN: ''
    },

};

window.CODE = CODE;

export default CODE;
