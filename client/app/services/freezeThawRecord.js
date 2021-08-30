export default class lockCoinSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    selectUserLockInfoByRules(params) {
        return this.Api.get('/userAssetChange/selectUserLockInfoByRules', params);
    };



}