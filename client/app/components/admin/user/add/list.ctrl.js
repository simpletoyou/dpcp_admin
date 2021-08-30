


class ListController {
    constructor($scope,adminSvc,roleService, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = adminSvc;
        this.roleService = roleService;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.account = '';
        this.createRole = '';
        this.userName = '';
        this.password = '123456';

        //角色列表
        this.$scope.roleList = [];

        this.condition = {
            pageNo:1,
            pageSize:30
        };


        this.init();
        //请求角色列表
        this.roleList()
    }


    roleList(){
        let json = {
            pageSize: 9999,
            pageNo: 1
        }
        this.roleService.getRoleList(json).then(res=>{
            
            if(res.code === window.CODE.SUCCESS){
                this.$scope.roleList = res.data.list;
            }else {
                window.toast(res.msg);
            }
        })
    }


    init() {

    }





    /**
     * 获取登录信息
     * */
    create(){
        let that = this;
        this.service.create({
            userName: this.userName,
            password: this.password,
            roleId: this.createRole,
            account: this.account
        }).then(rep => {
            if(rep.code===window.CODE.SUCCESS){
                window.toast("创建成功",{
                    callback(){
                        window.location.href = '#/admin/user';
                    }
                });
                this.userName = '';
                this.password = '';
                this.createRole = '';
                this.phone = '';
            }else{
                window.toast(rep.msg);
            }
        })
    }




}


export default ListController;
