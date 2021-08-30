/**
 * @desc
 * auther:yxc
 * date:2018年4月13日
 */
import googleAuthDialog from '../../../components/admin/passwordDialog.html';
class RolePermController {
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
        this.roleService = roleService;
        this.$uibModal = $uibModal;
        this.$location = $location;

        //当前角色
        this.$scope.roleName = this.$location.search().roleName;
        this.$scope.roleId = this.$location.search().roleId;

        console.log(this.$scope.roleName)
        console.log(this.$scope.roleId)

        //选择全部
        this.$scope.chooseAll = false

        //原始权限选择情况
        this.oldPerm = {}

        //新的权限选择情况
        this.newPerm = {}

        this.$scope.permList = []

        this.getRolePerm()
    }

    //节点选择
    roleNodeSelect(node){
        console.log('节点选择')
        console.log(node)
        let check  = node.hasChoose;
        this.checkNode(node,check)

        //如果点击是true的时候，勾选父节点
        // if(check){
        //     for(let n of this.$scope.permList){
        //         this.checkFather(n,node.menuName)
        //     }
        // }

        //检查是否应该取消勾选
        for(let n of this.$scope.permList){
            this.checkChoose(n)
        }

        //如果第一级勾选的话，第一个子节点必须勾选
        this.selectFirst()
    }

    selectFirst(){
        for(let d of this.$scope.permList){
            if(d.hasChoose){
                d.menuRoleDtoList[0].hasChoose = true
            }
        }
    }

    //勾选父节点
    checkFather(father,menuName){
        let i = 0;
        for(let n of father.menuRoleDtoList){
            if(n.menuName == menuName){
                father.hasChoose = true;
                let t = father.menuName
                for(let node of this.$scope.permList){
                    this.checkFather(node,t)
                }
                return
            }else {
                i++
            }
        }
        if(i == father.menuRoleDtoList.length){
            for(let node of father.menuRoleDtoList){
                this.checkFather(node,menuName)
            }
        }
    }

    //检查是否应该取消勾选
    checkChoose(father){
        let i = 0;
        for(let n of father.menuRoleDtoList){
            if(n.menuRoleDtoList && n.menuRoleDtoList.length>0){
                this.checkChoose(n)
            }
            if(n.hasChoose){
                i++
            }
        }
        father.hasChoose = i==0 ? false : true
    }

    //勾选子节点
    checkNode(node,check){
        node.hasChoose = check
        if(node.menuRoleDtoList && node.menuRoleDtoList.length>0){
            for(let n of node.menuRoleDtoList){
                this.checkNode(n,check)
            }
        }

    }

    //选择全部权限
    chooseAllPerm(node){
        for(let n of node){
            n.hasChoose = this.$scope.chooseAll
            if(n.menuRoleDtoList && n.menuRoleDtoList.length > 0){
                this.chooseAllPerm(n.menuRoleDtoList)
            }
        }
    }

    //获取权限状态
    getPermChoose(perm,node){
        for(let n of node){
            perm[n.menuId] = n.hasChoose
            if(n.menuRoleDtoList && n.menuRoleDtoList.length > 0){
                this.getPermChoose(perm,n.menuRoleDtoList)
            }
        }
    }


    //获取角色权限
    getRolePerm(){
        let json = {
            roleId: this.$scope.roleId
        }
        this.roleService.getRolePerm(json).then(res=>{
            console.log('角色权限')
            console.log(res)
            if(res.code === window.CODE.SUCCESS){
                this.$scope.permList = res.data
                this.oldPerm = {}
                this.getPermChoose(this.oldPerm,this.$scope.permList)
            }else {
                window.toast(res.msg)
            }
        })

        //测试数据
        // this.$scope.permList = [
        //     {
        //         "menuId": "111",
        //         "menuName": "角色",
        //         hasChoose: true,
        //         "menuRoleDtoList": [
        //             {
        //                 "menuId": "222",
        //                 "menuName": "角色管理",
        //                 hasChoose: false,
        //                 "menuRoleDtoList": [
        //                     {
        //                         "menuId": "333",
        //                         "menuName": "角色设置",
        //                         hasChoose: false,
        //                         "menuRoleDtoList": [
        //                         ]
        //                     },
        //                     {
        //                         "menuId": "444",
        //                         "menuName": "角色添加",
        //                         hasChoose: false,
        //                         "menuRoleDtoList": [
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ]
        //
        // this.oldPerm = {}
        // this.getPermChoose(this.oldPerm,this.$scope.permList)
    }

    //保存权限信息
    savePerm(){
        this.newPerm = {}
        this.getPermChoose(this.newPerm,this.$scope.permList)

        let arr = []

        for(let k in this.oldPerm){
            if(this.oldPerm[k] != this.newPerm[k]){
                let obj = {
                    menuId: k,
                    hasChoose: this.newPerm[k]
                }
                arr.push(obj)
            }
        }
        console.log("oldPerm:")
        console.log(this.newPerm)
        console.log("newPerm:")
        console.log(this.oldPerm)
        console.log("changePerm")
        console.log(arr)
        let json = {
            roleId: this.$scope.roleId,
            menuAddRoleDtos: arr
        }


        let that = this
        let modalInstance = this.$uibModal.open({
            template: googleAuthDialog,
            scope: this.$scope,
            controller() {}
        });
        this.$scope.$$ok = function (password) {
            that.roleService.saveRolePerm(json,{'login-password': password}).then(res=>{
                if(res.code === window.CODE.SUCCESS){
                    window.toast('保存成功')
                    that.getRolePerm()
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

export default RolePermController;