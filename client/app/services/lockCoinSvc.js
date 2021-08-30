/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/28
 */

export default class lockCoinSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 查询所有用户的锁仓记录
     * @param params
     */
    list(params = {}) {
        /*
            uid: 1,
            assetCode: 'ACT',
            createDate: 1513935181407,
            lockAmount: 1234,
            status: 'LOCK'  // LOCK UNLOCK
            totalLockAmount: '12345'
         */
        return this.Api.get('/lockposition/lock-user-record-list', params, null, false);
    }

    statList(params = {}) {
        /*
            uid: 1,
            assetCode: 'ACT',
            createDate: 1513935181407,
            lockAmount: 1234,
            status: 'LOCK'  // LOCK UNLOCK
            totalLockAmount: '12345'
         */
        return this.Api.get('/lockposition/lock-total-reward-list', params, null, false);
    }

    /**
     * 配置列表
     * @param params
     */
    configList(params = {}) {
        /*
        req:
        pageNo,
        pageSize

        res:

        {
            "code": "100200",
            "data": {
                "list": [
                    {
                        "assetCode": "ACT",
                        "createDate": 1514165974000,
                        "id": 1,
                        "profileKey": "LOCKDAY",
                        "profileValue": "20",
                        "updateDate": 1514165974000
                    },
                    {
                        "assetCode": "ACT",
                        "createDate": 1514166093000,
                        "id": 2,
                        "profileKey": "FOUNDATIONUID",
                        "profileValue": "2018",
                        "updateDate": 1514166093000
                    }
                ],
                "pageNo": 1,
                "pageNum": 1,
                "pageSize": 2,
                "total": 2
            },
            "msg": "成功"
        }




         */
        return this.Api.get('/lockposition/lock-list', params, null, false);
    }

    /**
     * 配置参数
     */
    configUpdate(params = {}, header = {}) {
        /*
        req:
            assetCode
            key: LOCKDAY,FOUNDATIONUID
            value: 0-28
         */
        return this.Api.get('/lockposition/lock-config', params, header, false);
    }


    /**
     * 清算锁仓奖励
     * */
    lockCalculateReward(params = {}, header = {}) {
        return this.Api.get('/lockposition/lock-calculate-reward', params, header, false);
    }



    /**
     * 发放锁仓奖励
     * */
    lockGrantReward(params = {}, header = {}) {
        return this.Api.get('/lockposition/lock-grant-reward', params, header, false);
    }


    /**
     * 强制解锁
     * */
    forceUnlock(params = {}, header = {}){
        return this.Api.get('/lockposition/force-unlock',params,header,false);
    }



}
