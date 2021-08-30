export default class dongjiefrozenSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }
    //获取用户比例分配列表
    UserDictList(params){
        return this.Api.get('/allocationpropor_userdice/getAllocationProportion', params);
    };
    /**
     * 添加冻结比例配置表
     * @param pageNo pageSize
     **/
    upDatePointsAllocateDict(params){
        return this.Api.get('/allocationpropor_userdice/changeAllocationProportionDict', params);
    };

    /**
     * 更新冻结比例配置表
     * @param pageNo pageSize
     **/
    updateDatePointsAllocateDict(params){
        return this.Api.get('/allocationpropor_userdice/updateAllocationProportionDict', params);
    };

    /**
     * 解锁
     */
    saveDatePointsAllocateDict(params){
        return this.Api.get('/allocationpropor_userdice/savelottery_isenable', params);
    };

    /**
     * 获取状态
     */
    getDatePointsAllocateDictStatus(params){
        return this.Api.get('/allocationpropor_userdice/queryAllocationTByStatus', params);
    };

    /**
     * 解锁
     */
    saveDatePointsAllocateDictFrozen(params){
        return this.Api.get('/allocationpropor_userdice/savelottery_isenableFrozen', params);
    };

    /**
     * 删除
     * @param params
     * @returns {*}
     */
    deleteAllocationProportion(params){
        return this.Api.get('/allocationpropor_userdice/delete', params);
    };

    /**
     * 修改
     */
    getAllocationProportion(params){
        return this.Api.get('/allocationpropor_userdice/queryAllocationTByUidAndAssetCode', params);
    };
}