/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:33
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 17:08:33
 */
const tree_items = [
    //菜单列表
    {
        role: 'ADMIN',
        title: '账户管理',
        default: true,
        url: '/admin/user', //随便写的
        nodes: [{
                title: '账号管理',
                url: '/admin/user', //随便写的
                pattern: /\/admin\/user\/?\S*$/

            }
        ]
    },
    //DPCP Box
    {
        default: true,
        title: 'DPCP Box',
        url: '/dpcp/config',
        nodes: [{
                title: '参数配置',
                url: '/dpcp/config',
            },
            {
                title: '产品文档',
                url: '/dpcp/files'
            },
            {
                title: '公告发布',
                url: '/dpcp/notice'
            },
            {
                title: '用户反馈',
                url: '/dpcp/feedback'
            }
        ]
    },

    //管理员（客服）
    {
        // role:'USER',
        default: true,
        title: '账户管理',
        url: '/commonusers/commonusers',

        nodes: [{
                title: '账号管理',
                url: '/account/loginInfo'
            },
            {
                title: 'KYC审核',
                url: '/commonusers/kycs/verify',
                pattern: /\/kycs\/\w+$/
            },
            {
                title: '锁定用户',
                url: '/commonusers/locketlist'
            },
            {
                title: 'C2C申诉管理',
                url: '/c2c/complaint'
            },
            {
                title: 'C2C代理管理',
                url: '/commonusers/c2cAgent'
            },
            {
                title: '会员配置',
                url: '/commonusers/member'
            },
        ]
    }
];


let TreeConfigFactory = function () {
    function item2map(items, map) {
        map = map || {};
        items.forEach(function (item) {
            if (item.url) {
                map[item.url] = item;
            }
        });
        return map;
    }

    const TREE_CONFIG = item2map(tree_items);

    return {
        getData: function () {
            return TREE_CONFIG;
        }
    }
}

export default TreeConfigFactory;