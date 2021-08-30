/**
 * author zhaojing
 */
class ListController {

    constructor($scope, financeCheckSvc, commonSvc) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.scope = $scope;
        this.service = financeCheckSvc;
        this.commonSvc = commonSvc;

        this.list = null;
        this.isLoading = false;

        this.condition = {
            "pageNo": 1,
            "pageSize": 10,
            "status": "",
            "assetType": ""
        };
        this.init();

    }

    /**
     * @return {null}
     */
    init() {
        this.fetchList();
    }


    /**
     * 获取列表
     */
    fetchList() {
        let param = Object.assign({}, this.condition);
        this.isLoading = true;
        this.service.fixMismatchList(param).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {

                this.list = rep.data.list//_.reject(rep.data.list,{status:'INIT'});//rep.data.list
                if (this.list != null && this.list.length > 0) {
                    this.list.forEach((item)=>{
                        item.showDetail = false;
                        item.accountTypeText = this.formatAccountType(item.accountType);
                        item.assetType = this.formatAssetType(item.assetType);
                        item.optTypeText = this.formatOptType(item.optType);
                        item.mismtach = this.formatMismtachType(item.moreAmount,item.lessAmount,item.assetType.unit,item.fixOperationType);
                        item.fixOperationTypeText = this.formatFixType(item.fixOperationType);
                    })
                }else{
                    this.list = [];
                }
                this.totalNum = rep.data.totalNum;
            } else {
                this.list = [];
                window.toast(rep.msg);
            }
        })



    }


    //格式化账户类型：个人、商户
    formatAccountType(val){
        let name = '';
        if(val=='INDIVIDUAL'){
            name = '个人'
        }else if(val=='BUSINESS'){
            name = '商户'
        }
        return name;
    }

    //格式化资产类型：人民币、果仁
    formatAssetType(val){
        let assetType = {};
        switch (val) {
            case 'CNY':
                assetType.name = '人民币';
                assetType.unit = '￥'
                break;
            case 'GOP':
                assetType.name = '果仁';
                assetType.unit = 'G'
                break;
            default:
                assetType.name = val;
                assetType.unit = ''
        }
        return assetType;
    }

    //格式化操作类型：充值、转出
    formatOptType(val){
        let name = '';
        switch (val) {
            case 'IN':
                name = '充值';
                break;
            case 'OUT':
                name = '转出';
                break;
            default:
                name = val;
        }
        return name;
    }

    //格式化差错类型：多账、短账、状态不一致  依据moreAmount和lessAmount判断
    //格式化不同差错类型可执行的操作：重新匹配、差错处理、人工打款、坏账处理
    formatMismtachType(moreAmount,lessAmount,assetType,fixType){
        let mismtach={};
        if(moreAmount>0&&lessAmount==0){
            mismtach.name='多账';
            mismtach.badVal='+'+moreAmount.toFixed(2)+assetType;
        }else if(moreAmount==0&&lessAmount>0){
            mismtach.name='短账';
            mismtach.badVal='-'+lessAmount.toFixed(2)+assetType;
        }else if(moreAmount==0&&lessAmount==0){
            mismtach.name='状态不一致';
            mismtach.badVal=0.00+assetType;
        }
        //如果不是坏账，不需要显示坏账金额
        if(fixType!='BAD_ACCOUNT'){
            mismtach.badVal='';
        }

        return mismtach;
    }

    formatFixType(fixType){
        let fixTypeText = '';
        //MANUAL_REFUND, BAD_TYPEING, REMATCH, MANUAL_PAY, DEDUCT_ASSET, ADD_ASSET;
        //人工退款，坏账处理，重新匹配，人工打款，资产修复（最后两个）
        switch (fixType) {
            case 'MANUAL_REFUND':
                fixTypeText = '人工退款';
                break;
            case 'BAD_ACCOUNT':
                fixTypeText = '坏账处理';
                break;
            case 'REMATCH':
                fixTypeText = '重新匹配';
                break;
            case 'MANUAL_PAY':
                fixTypeText = '人工打款';
                break;
            case 'DEDUCT_ASSET':
                fixTypeText = '资产修复';
                break;
            case 'ADD_ASSET':
                fixTypeText = '资产修复';
                break;
            default:
                fixTypeText = '';
        }
        return fixTypeText;
    }

    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    toggleDetail(item) {
        item.showDetail = !item.showDetail;
    }


}

export default ListController;


