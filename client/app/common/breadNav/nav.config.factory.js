let NavConfigFactory = function () {

    let businessJSON = {
        url: '/business/businesshome',
        name: '商户首页'
    };

    let orderARR = [
        businessJSON, {
            url: '/app/desc',
            name: '应用名称'
        }
    ];

    let createAppJSON = [
        businessJSON, {
            url: '/app/create',
            name: '创建应用'
        }
    ];

    //========================================== 相关页面配置 
    let NAV_CONFIG = {

        '/app/add': [{
            url: '/order/list',
            name: '订单列表'
        }, {
            name: '应用添加'
        }],

        '/sheet/download': [
            businessJSON, {
                url: '/sheet/download',
                name: '报表下载'
            }],

        '/app/create': createAppJSON,

        // =============================  应用概况  交易管理  应用信息
        '/app/desc': orderARR,

        '/order/list': orderARR,

        '/order/refund': orderARR,

        '/order/settlement': orderARR,

        '/app/infor': orderARR,
        '/refund/list': orderARR,

        // =============================  我的相关
        '/mine/total': [
            businessJSON, {
                name: '我的帐户',
            }, {
                name: '帐户总览',
            }
        ],
        '/mine/infor': [
            businessJSON, {
                name: '我的帐户',
            }, {
                name: '基本信息',
            }
        ],
        '/mine/editpwd': [
            businessJSON, {
                name: '我的帐户',
            }, {
                name: '修改密码',
            }
        ],
        // =============================  修改密码相关
        '/resetpassword1': [
            businessJSON, {
                name: '重置密码',
            }
        ],
        '/resetpassword2': [
            businessJSON, {
                name: '重置密码',
            }
        ],


    };

    return {
        getData: function () {
            return NAV_CONFIG;
        }
    }
};

export default NavConfigFactory;