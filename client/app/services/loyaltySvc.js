export default class loyaltySvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }
    /**
     * 查询所有配置数据
     * @param pageNo pageSize
     **/
    queryLoyalPlanAllocation(params){
        return this.Api.get('/loyal/planallocation', params);
    };

    /**
     * 修改状态
     * @param pageNo pageSize
     **/
    updatePlanallocationByStatus(params){
        return this.Api.get('/loyal/updatePlanallocationByStatus', params);
    };
    /**
     * 添加计划配置
     * @param pageNo pageSize
     **/
    savePlanallocation(params){
        return this.Api.get('/loyal/savePlanallocation', params);
    };

    /**
     * 修改计划配置
     * @param pageNo pageSize
     **/
    savePlanallocation(params){
        return this.Api.get('/loyal/savePlanallocation', params);
    };

    updatePlanallocation(params){
        return this.Api.get('/loyal/updatePlanallocation', params);
    };

    getPlanAllocationId(params){
        return this.Api.get('/loyal/getPlanAllocationId', params);
    };
}