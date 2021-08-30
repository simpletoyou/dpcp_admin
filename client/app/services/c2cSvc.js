/**
 * Created by zhaojing on 2017/11/27.
 */



export default class c2cSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }



    /**
     * c2c申诉 分页查询
     * @param params
     * @returns {*}
     */
    c2cComplaintQuery(params = {}) {
        return this.Api.get('/c2ccomplaint/query', params);
    }


    /**
     * c2c申诉 详情查询
     * @param params
     * @returns {*}
     */
    c2cComplaintDetail(params = {}) {
        return this.Api.get('/c2ccomplaint/detail', params);
    }


    /**
     * c2c申诉 强制打币
     * @param params
     * @returns {*}
     */
    c2cComplaintTransforForce(params = {}, header) {
        return this.Api.get('/c2ccomplaint/transfor-force', params, header);
    }


    /**
     * c2c申诉 强制关闭订单
     * @param params
     * @returns {*}
     */
    c2cComplaintCloseForce(params = {}, header) {
        return this.Api.get('/c2ccomplaint/close-force', params, header);
    }

    //C2C收购区强制打币
    c2cBuyTransferForce(params = {}, header) {
        return this.Api.get('/c2ccomplaint/purchase-transfer-force', params, header);
    }

    //C2C收购区强制关闭订单
    c2cBuyCloseForce(params = {}, header) {
        return this.Api.get('/c2ccomplaint/purchase-close-force', params, header);
    }
}