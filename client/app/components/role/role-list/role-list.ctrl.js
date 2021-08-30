/**
 * @desc
 * auther:yxc
 * date:2018年4月13日
 */

import googleAuthDialog from '../../../components/admin/passwordDialog.html';

class RoleListController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope, roleService, enumSvc, commonSvc, $location,$uibModal) {
        'ngInject';
        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.roleService = roleService;
        this.$location = $location;

        //分页数据
        this.$scope.totalNum = 0
        this.$scope.pageSize = 10
        this.pageNo = 1

        this.$scope.roleList = [
            {roleId: 111,roleName: '角色1',count: 10}
        ]

        this.roleList()
    }

    //获取角色列表
    roleList(){
        let json = {
            pageSize: this.$scope.pageSize,
            pageNo: this.pageNo
        }
        this.roleService.getRoleList(json).then(res=>{
            console.log("获取角色列表")
            console.log(res)
            if(res.code === window.CODE.SUCCESS){
                this.$scope.roleList = res.data.list;
                this.$scope.totalNum = res.data.total
                this.pageNo = res.data.pageNo
            }else {
                window.toast(res.msg);
            }
        })
    }

    //分页数据改变
    pageChanged(pageNo){
        this.roleList()
    }

    //跳转到人员查看界面
    rolePeople(roleId){
        console.log('跳转到人员查看界面')
        let url = '/role/people/?roleId=' + roleId
        this.$location.url(url);
    }

    //跳转到权限管理页面
    rolePerm(role){
        console.log('跳转到权限管理页面')
        let url = '/role/perm/?roleName=' + role.roleName + '&roleId=' + role.roleId
        this.$location.url(url);
    }

    //删除角色
    delRole(roleId){
        let that = this
        let modalInstance = this.$uibModal.open({
            template: googleAuthDialog,
            scope: this.$scope,
            controller() {}
        });
        this.$scope.$$ok = function (password) {
            console.log(password)
            that.roleService.delRole({roleId: roleId},{'login-password': password}).then(res=>{
                if(res.code === window.CODE.SUCCESS){
                    that.roleList()
                }else {
                    window.toast(res.msg);
                }
            })
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };
    }

}

export default RoleListController;