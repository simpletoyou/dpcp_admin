/**
 * Created by zhaojing on 2017/10/13.
 */


export default class coinAddAutoSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }


    /**
     * 添加新币
     * @param params
     */
    coinAdd(params = {}, header = {}) {
        /*
         key: 'assetfeerate'
         configSymbol: ''   // BTC_ETH/BTC_ACT/......USC_BTC
         value
         */
        return this.Api.get('/transaction-config/config-update', params, header);
    }

    



}
