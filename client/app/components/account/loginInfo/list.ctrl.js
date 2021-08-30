import passwordDialog from '../passwordDialog.html';



class ListController {
    constructor($scope, accountSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = accountSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.list = null;
        this.loading = false;

        this.condition = {
            pageNo: 1,
            pageSize: 20,
            pageNum:0
        };

        this.init();
    }

    init() {
        this._fetchLoginLog();

    }

    _fetchLoginLog(){
        this.loading = true;
        let param = {
            pageNo: this.condition.pageNo,
            pageSize: this.condition.pageSize
        };

        this.service.fetchLoginLog(param).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.list = rep.data.list;
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            } else {
                window.toast(rep.msg);
            }
            this.loading = false;
        })
    }

}


export default ListController;
