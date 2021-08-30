/**
 * @desc
 * auther:yxc
 * date:2018年4月13日
 */
import googleAuthDialog from '../../../components/admin/passwordDialog.html';

class RoleAddController {
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

        this.roleName = ''
    }

    //添加角色
    addRole(){
        console.log('添加角色')
        if(this.roleName === ''){
            window.toast('角色名称不能为空。')
            return
        }
        let that = this
        let modalInstance = this.$uibModal.open({
            template: googleAuthDialog,
            scope: this.$scope,
            controller() {}
        });
        this.$scope.$$ok = function (password) {
            console.log(password)
            that.roleService.addRole({roleName:that.roleName},{'login-password': password}).then(res=>{
                if(res.code === window.CODE.SUCCESS){
                    let url = '/role/list'
                    that.$location.url(url)
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

export default RoleAddController;