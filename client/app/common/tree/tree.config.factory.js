/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:33
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-30 10:58:35
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
    //角色
    {
        // role:'USER',
        default: true,
        title: '角色',
        url: '/role/list',
        nodes: [{
                title: '角色管理',
                url: '/role/list',
            },
            {
                title: '添加角色',
                url: '/role/add'
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