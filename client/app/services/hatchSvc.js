/**
 * Created by zhaojing on 2017/10/13.
 */


export default class settingsSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 资产配置更新
     * @param params
     */
    coinConfigUpdate(params = {}, header = {}) {
        return this.Api.post('/hatch/updateCionConfig', params, header);
    }


    /**
     * 交易对的配置列表
     * @param params
     */
    getCoinTrans(params = {}) {
        return this.Api.get('/hatch/getCionTrans', params);
    }


    /**
     * 添加新币
     */
    coinAdd(params = {}, header = {}) {
        return this.Api.post('/managerAssetAndSymbol/configasset-edit', params, header);
    }

    /**
     * 查询申请记录
     */
    getApplys(query, params = {}) {
        return this.Api.post('/hatch/getApplys?'+query, params);
    }


     /**
     * 查询申请记录
     */
    doApply(params = {},header = {}) {
        return this.Api.post('/hatch/doApply', params,header);
    }

      /**
     * 查询权益转出配置
     */
    getEquityTrans(params = {},header = {}) {
        return this.Api.get('/hatch/getEquityTrans', params,header);
    }

     /**
     * 孵化区权益划转配置更新接口
     */
    updateEquityTrans(params = {},header = {}) {
        return this.Api.post('/hatch/updateEquityTrans', params,header);
    }

      /**
     * 查询划转记录接口
     */
    getTransRecords(query,params = {}) {
        return this.Api.post('/hatch/getTransRecords?'+query, params);
    }

      /**
     * 查询划转统计接口
     */
    getStatistics(params = {}) {
        return this.Api.get('/hatch/getStatistics', params);
    }

      /**
     * 查询其他接口
     */
    getLevleReward(query,params = {}) {
        return this.Api.post('/hatch/getLevleReward?'+query, params);
    }
     /**
     * 空投
     */
    doAirdropSame(params = {}) {
        return this.Api.post('/airdrop/doAirdrop-same', params);
    }
     /**
     * 空投
     */
    doAirdropDiff(params = {},header = {}) {
        return this.Api.post('/airdrop/doAirdrop-diff', params,header);
    }
     /**
     * 空投
     */
    queryPage(params = {}) {
        return this.Api.post('/airdrop/queryPage', params);
    }
     /**
     * 空投
     */
    uploads(params = {},header = {}) {
        return this.Api.post('/airdrop/upload', params,header);
    }
    /**
     * 可撤单分页查询
     */
    queryCanCancelOrderPage(params = {},header = {}) {
        return this.Api.post('/match/queryCanCancelOrderPage', params,header);
    }

    /**
     * 批量撤单
     */
    batchCancel(params = {},header = {}) {
        return this.Api.post('/match/match-order/batchCancel', params,header);
    }
    /**
     * 交易对列表
     * @param params
     */
    symbolList(params = {}) {
        return this.Api.get('/managerAssetAndSymbol/configsymbol-list', params);
    }
}
