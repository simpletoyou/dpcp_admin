/**
 * Created by zhaojing on 2017/10/13.
 */


export default class settingsSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 资产列表
     * @param params
     */
    coinList(params = {}) {
        /**
         * res:
         * [
         * {
         *
         *  private Integer id;
	        private String symbol;
	        //key使用枚举
	        private String profileKey;
	        private String profileValue;
         * }
         * ]
         */
        return this.Api.get('/managerAssetAndSymbol/configasset-list', params);
    }

    /**
     * 资产配置列表
     * @param params
     */
    coinConfigList(params = {}) {
        return this.Api.get('/managerAssetAndSymbol/configassetprofile-list', params);
    }

    /**
     * 资产配置更新
     * @param params
     */
    coinConfigUpdate(params = {}, header = {}) {
        return this.Api.get('/managerAssetAndSymbol/configassetprofile-edit', params, header);
    }

    /**
     * 交易对列表
     * @param params
     */
    symbolList(params = {}) {
        return this.Api.get('/managerAssetAndSymbol/configsymbol-list', params);
    }

    /**
     * 交易对分区配置
     * @param params
     */
    SymbolRegion(params = {}) {
        return this.Api.get('/managerAssetAndSymbol/setSymbolRegion', params);
    }

    /**
     * 交易对的配置列表
     * @param params
     */
    symbolConfigList(params = {}) {
        return this.Api.get('/managerAssetAndSymbol/configsymbolprofile-list', params);
    }


    /**
     * 添加新币
     */
    coinAdd(params = {}, header = {}) {
        return this.Api.post('/managerAssetAndSymbol/configasset-edit', params, header);
    }


    /**
     * 添加交易对
     */
    symbolAdd(params = {}, header = {}) {
        return this.Api.post('/configsymbol', params, header);
    }








    /**
     * 交易手续费
     * @param params
     */
    transactionUpdate(params = {}, header = {}) {
        /*
         key: 'assetfeerate'
         configSymbol: ''   // BTC_ETH/BTC_ACT/......USC_BTC
         value
         */
        return this.Api.get('/transaction-config/config-update', params, header);
    }

    /**
     * 交易手续费查询
     * @param params
     */
    transactionQuery(params = {}) {
        /**
         * res:
         * [
         * {
         *
         *  private Integer id;
	        private String symbol;
	        //key使用枚举
	        private String profileKey;
	        private String profileValue;
         * }
         * ]
         */
        return this.Api.get('/transaction-config/config-list', params);
    }

    /**
     * 提币手续费更新
     * @param params
     */
    configUpdate(params = {}, header = {}) {
        /*
        req:
            key="withdrawminfee"
            asset: ''   // BTC/LTC/ACT/USC/ETH
            value
         */
        return this.Api.get('/withdraw-config/config-update', params, header);
    }

    /**
     * 提币手续费查询
     * @param params
     */
    configQuery(params = {}) {
        /*
           req:
            key="withdrawminfee"


            对应值：
         WITHDRAW_TYPE_FEE: 'withdrawminfee',        // 手续费
         WITHDRAW_TYPE_LIMIT: 'withdrawdailymax'     // 提币每日限额
         */

        /**
         * res:
         * [
         * {
         *
            private Integer id;
	        private String assetCode;
	        private String profileKey;
	        private String profileValue;
         * }
         * ]
         */
        return this.Api.get('/withdraw-config/config-list', params);
    }

    chainUpdate(params = {}, header = {}) {
        return this.Api.post('/managerAssetAndSymbol/update-asset', params, header);
    }

    /**
     * 登陆ip记录
     */
    ipQuery(params = {}) {
        /*
         req:
            pageNo: 1,
            pageSize:
         */

        /**
         * res:
         * [
         * {
            private Integer id;
            private Integer uid;
            private String ipAddress;
            private Date createDate;
         * }
         * ]
         */
        return this.Api.get('/login-ipaddress/ip-list', params);
    }

    /**
     * 新增白名单用户
     * @param uid, password
     * */
    addWhiteListconfig(params = {}, header = {}) {
        return this.Api.get('/whiteListconfig/add', params, header);
    }


    /**
     * 删除白名单用户
     * @param uid
     * */
    deleteWhiteListconfig(params = {}, header = {}) {
        return this.Api.get('/whiteListconfig/delete', params, header);
    }


    /**
     * 查询白名单用户
     * @param pageNo pageSize
     **/
    queryWhiteListconfig(params) {
        return this.Api.get('/whiteListconfig/query', params)
    }

    /**
     * 查询算力配置表
     * @param pageNo pageSize
     **/
    getPointsAllocate(params) {
        return this.Api.get('/bonus-points/getPointsAllocate', params)
    }

    /**
         * 查询会员配置表
         * @param
         **/
    getMember(params) {
        return this.Api.get('/bonus-points/getPointsAllocate', params)
    }

    /**
         * 更新会员配置表
         * @param
         **/
        setMember(params) {
            return this.Api.get('/bonus-points/setMemberConfig', params)
        }


    /**
     * 更新算力配置表
     * @param pageNo pageSize
     **/
    upDatePointsAllocate(params) {
        return this.Api.get('/bonus-points/changePointsAllocate', params)
    }

    /**
     * 查询发放奖励配置
     * @param pageNo pageSize
     **/
    getAllconfigInfo(params) {
        return this.Api.get('/allocate-config/getAllRewardConfigInfo', params)
    }
    /**
     * 更新发放状态
     * @param pageNo pageSize
     **/
    allocateCoinToUser(params) {
        return this.Api.get('/allocate-config/allocateCoinToUser', params)
    }

    /**
     * 更新发放状态(IEP)
     * @param pageNo pageSize
     **/
    allocateCoinToUserIep(params) {
        return this.Api.get('/allocate-iep-record/allocateCoinToUser', params)
    }

    /**
     * 新增发放币种
     * @param pageNo pageSize
     **/
    insertRewardConfig(params) {
        return this.Api.get('/allocate-config/insertRewardConfig', params)
    }

    /**
     * 算力初始化
     * @param pageNo pageSize
     **/
    allocatePointsInit(params) {
        return this.Api.get('/allocate-config/allocatePointsInit', params)
    }

    /**
     * 算力统计
     * @param pageNo pageSize
     **/
    allocatePointsCount(params) {
        return this.Api.get('/allocate-config/allocatePointsCount', params)
    }

    /**
     * 算力统计
     * @param pageNo pageSize
     **/
    allocatePointsCount(params) {
        return this.Api.get('/allocate-config/allocatePointsCount', params)
    }

    /**
     * 获取持仓解锁比率
     **/
    selectAmountRate(params) {
        return this.Api.get('/config-json/getAllConfig', params)
    }

     /**
     * 修改持仓解锁比率
     **/
    updateAmountRate(params,header = {}) {
        return this.Api.get('/config-json/updateUnlockingRate', params,header)
    }

}
