/**
 * author liubingli
 */
class AssetViewController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope, assetViewSvc, $location) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.$scope = $scope;
        this.assetViewSvc = assetViewSvc;
        this.isLoading = false;
        this.basicInfo = {};
        this.condition = {
            uid: '',
            pageNo:1,
            // pageSize: $scope.$root.$coinList.length,
            pageSize: 500
        };
        this.list = [];
        this.isNoData = false;

        this.getData();
    }

    getData() {
        // this.queryFinance();
        this.queryBasicInfo();
    }

    queryFinance() {
        let params = {
            "brokerId": this.brokerid,
            "uid": this.condition.uid,
            "pageNo": this.condition.pageNo,
            "pageSize": this.condition.pageSize
        };
        this.isLoading = true;
        this.assetViewSvc.businessFinance(params)
            .then(rep=> {
                this.isLoading = false;
                if (rep.code === window.CODE.SUCCESS) {
                    this.list = [];
                    if (rep.data.list.length === 0) {
                        this.isNoData = true;
                    } else {
                        this.isNoData = false;
                        this._doAssetData(rep.data.list);
                        // this.totalNum = rep.data.pageNum * rep.data.pageSize;
                    }

                }
            }, err=> {
                console.log('err');
            });

    }

    _doAssetData(data) {
        let asset;
        $.map(data, (item, index) => {

            let temp;

            // 找相同人的那一项
            asset = _.find(this.list, function(assetItem) {
                return assetItem.uid === item.uid;
            });
            // 初始化所有的账户
            if(asset === undefined){
                asset = {
                    uid: item.uid
                };
                $.map(this.$scope.$root.$coinList, (subItem, index) => {
                    asset[subItem.value] = {};
                });
                this.list.push(asset);
            }

            // 把资产放入到指定资产当中
            asset[item.assetCode] = {
                availiable: item.availiable,
                loan: item.loan,
                lock: item.lock
            };

        });

        // console.log(JSON.stringify(this.list));

    }

    queryBasicInfo(){
        let params = {
            "brokerId": this.brokerid,
        };
        this.assetViewSvc.getBrokerInfo(params)
            .then(rep=> {
                this.isLoading = false;
                if (rep.code === window.CODE.SUCCESS) {
                    this.basicInfo = rep.data;
                }
            }, err=> {
                console.log('err');
            });
    }
}

export default AssetViewController;