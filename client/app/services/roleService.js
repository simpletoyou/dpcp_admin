export default class rowService {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    //获取角色列表
    getRoleList(params){
        return this.Api.get('/roleManager/role-list', params);
    }

    //角色管理-人员查看
    getRoleUser(params){
        return this.Api.get('/roleManager/admin-role-list', params);
    }

    //获取角色权限
    getRolePerm(params){
        return this.Api.get('/roleManager/menu-role-list', params);
    }

    //保存角色权限
    saveRolePerm(params,header){
        return this.Api.post('/roleManager/update-role-menu', params,header);
    }

    //添加角色
    addRole(params,header){
        return this.Api.get('/roleManager/add-role', params,header);
    }

    //删除角色
    delRole(params,header){
        return this.Api.get('/roleManager/delete_role', params,header);
    }


    // commonusers(params) {
    //     return this.Api.get('/user/user-list', params);
    // }
}