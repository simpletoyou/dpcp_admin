import roleService from "../../../services/roleService";

/**
 * @desc
 * auther:yxc
 * date:2018年4月13日
 */
class RolePeopleController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope, roleService, enumSvc, commonSvc, $location) {
        'ngInject';
        this.$scope = $scope;
        this.roleService = roleService;
        this.$location = $location;

        //分页数据
        this.$scope.totalNum = 0
        this.$scope.pageSize = 10
        this.pageNo = 1

        //角色列表
        this.roleId = this.$location.search().roleId
        this.$scope.roleUserList = [];

        this.roleUser()

    }

    //分页数据改变
    pageChanged(pageNo){
        this.roleUser()
    }

    //返回添加时间
    returnTime(time){
        let d = new Date(time)
        return this.$scope.$root.moment(d).format("YYYY-MM-DD HH:mm:ss")
    }

    roleUser(){
        let json = {
            roleId: this.roleId,
            pageSize: this.$scope.pageSize,
            pageNo: this.pageNo
        }
        this.roleService.getRoleUser(json).then(res=>{
            if(res.code === window.CODE.SUCCESS){
                this.$scope.roleUserList = res.data.list
                this.$scope.totalNum = res.data.total
                this.pageNo = res.data.pageNo
            }else {
                window.toast(res.msg)
            }
        })
    }

}

export default RolePeopleController;