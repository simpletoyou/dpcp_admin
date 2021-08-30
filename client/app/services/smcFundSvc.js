/**
 * Created by zhaojing on 2017/10/13.
 */


export default class smcFundSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }


    /**
     * 更新
     * @param params
     * @param header
     */
    configUpdate(params = {}, header = {}) {
        /*
            req:

            fundAssetCode: 'SMCF1',
            key: ''         // TICKETSTATUS 入场券的时间，FUNDBEGINDATE, FUNDENDDATE
            value: ''
TICKETASSETCODE
TICKETASSETAMOUNT
TICKETBEGINDATE
TICKETENDDATE
TICKETUID
FUNDBEGINDATE
FUNDENDDATE
FUNDUID
FUNDINCOMEASSETCODE
FUNDINCOMERATE
TICKETSTATUS

         */
        return this.Api.get('/quantfund/config', params, header);
    }

    /**
     * 查询
     * @param params
     */
    configQuery(params = {}) {
        /**
         * req:
         *  pageSize
            pageNo
            key: '',
            fundAssetCode: 'SMCF1'

         */
        /**
         * res:
         * data: {
         *      list: [
         *          {
         *              assetCode:,
         *              profileValue
         *          }
         *      ]
         * }
         */
        return this.Api.get('/quantfund/list', params);
    }


    // 活动相关开关
    /**
     * 查询列表
     * @param params
     */
    preList(params = {}) {
        return this.Api.get('/quantfund/fund-symbol-list', params, null, false);
    }

    /**
     * 设置开关
     * @param params
     * @param header
     * @returns {*}
     */
    preUpdate(params = {}, header = {}) {
        /**
         fundAssetCode
         tradeAssetCode
         */
        return this.Api.get('/quantfund/fund-symbol-config', params, header, false);
    }

}
