


class ListController {
    constructor($scope,adminSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = adminSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.list = null;

        this.condition = {
            pageNo:1,
            pageSize:30
        };


        this.init();
    }

    init() {
        this.fetchLoginInfo();
    }





    /**
     * 获取登录信息
     * */
    fetchLoginInfo(){
        let uid = this.$location.search().uid;

        let param = Object.assign({adminId:uid}, this.condition);

        this.service.queryOperationLog(param).then(rep=>{
            if(rep.code === window.CODE.SUCCESS){
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            }else{
                window.toast(rep.msg);
            }
        })
    }




}


export default ListController;
