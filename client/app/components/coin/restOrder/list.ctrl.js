
import config from '../config';
import bigdecimal from 'bigdecimal'
import passwordDialog from './../passwordDialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, coinSvc, $uibModal, $location, $state) {
        "ngInject";

        this.type = $state.params.type;

        this.$scope = $scope;
        this.service = coinSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.list = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.pageNum = 0;

        this.$scope.keyWord = 'id';
        this.$scope.keyWordText = null;

        this.condition = {
            brokerId:'',
            symbol: $state.params.type.toUpperCase(),
            status: "",
            type: "",
            pageNo: 1,
            pageSize: config.PAGE_SIZE
        };
        this.init();
    }

    init() {
        this.fetchList();
        //当筛选类别改变时清空搜索框
        this.$scope.$watch('keyWord', (newValue, oldValue) => {
            this.$scope.keyWordText = '';
        });
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    /**
     * 获取列表
     * 带参数的搜索
     */

    fetchList() {
        let param = Object.assign({}, this.condition);
        if (this.$scope.keyWordText) {
            param[this.$scope.keyWord] = this.$scope.keyWordText;
        }
        this.service.trade(param).then(rep => {
            this.isLoading = false;
            if(rep.code===window.CODE.SUCCESS){
                this.list = getFormattedList(rep.data.list);
                this.totalNum = rep.data.pageNum * this.condition.pageSize;
            }else{
                window.toast(rep.msg);
            }
        });

        function getFormattedList(list) {
            if (list.length > 0) {
                $.map(list, (item, index) => {
                    if (item.tradeCoinType === 'BUY' && item.tradeCoinFlag === 'MARKET') {
                        item.numTotalText = item.market;
                        item.numOverText = item.marketOver;
                    } else {
                        item.numTotalText = item.numTotal;
                        item.numOverText = item.numOver;
                    }
                   item.price = new bigdecimal.BigDecimal(''+item.price).toPlainString();
                });
            }
            return list;
        }
    }

    //查看个人信息
    searchinfo(data){
        this.userid=data;
        this.$location.url('/commonusers/personalinfo?uid='+this.userid);
    }



    cancelOrder(orderNo,uid){
        let that = this;
        let modalInstance = this.$uibModal.open({
            animation: false,
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (value) {
            if (value === '') {
                window.toast('请输入登陆密码');
                return;
            }


            that.service.tradeCoinCancelByid({
                symbol: that.condition.symbol,
                orderNo,
                uid
            }, {
                'login-password': value
            }).then(rep => {
                this.isLoading = false;
                if(rep.code===window.CODE.SUCCESS){
                    doSuccess(rep);
                }else{
                    window.toast(rep.msg);
                }
            });

        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };

        modalInstance.opened.then(() => {
            this.$scope.$$password = '';
        });

        function doSuccess(rep) {
            if (rep.code === window.CODE.SUCCESS) {
                modalInstance.dismiss('ok');
                that.fetchList();
            } else {
                window.toast(rep.msg);
            }
        }





    }
}


export default ListController;
