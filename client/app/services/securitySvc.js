/**
 * Created by zhaojing on 2017/2/9.
 */
export default class securitySvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 获取身份认证信息列表
     * {
           "status":"CURRENT|HISTORY",
           "pageNo":0,
           "pageSize":10
           [userId:1]
        }
     * @returns
     * {
            "data": {
                "pageNo": 1,
                "pageSize": 10,
                "pageNum": 2,
                "list": [
                    {
                          "id":"",
                          "userId":"",
                          "countryId":"",
                          "country":"",
                          "cardType":"",
                          "cardNo":"",
                          "expiredDate":"",
                          "cardPhoto":"",
                          "cardHandhold":"",
                          "status":"",
                          "auditUserId":"",
                          "auditDate":"",
                          "auditFirst":"",
                          "auditStatus":"",
                          "auditMessageId":"",
                          "auditMessage":"",
                          "createDate":"",
                          "updateDate":"",
                          "name":"jack~jack~jack"
                    }
                ]
            },
            "msg": "success",
            "status": "200"
        }
     *
     */
    identityAuthenticationList(params = {}) {
        return this.Api.get('/security/overseas/identities', params);
    }

    /**
     *获取身份认证信息详情
     * param{"id":"111"}
     *
     * return{
     *      "data":{
          		"basicInfo":{
                    "firstName":"jack",
          			"middleName":"jack",
                    "lastName":"Jack",
                    "gender":"male|female",
                    "birthday":"2015-01-01"
                    "countryId":"1"
                },
          		"identityInfo":{
                                "id":"",
                                "userId":"",
                                "countryId":"",
                                "country":"",
                                "cardType":"",
                                "cardNo":"",
                                "expiredDate":"",
                                "cardPhoto":"",
                                "cardHandhold":"",
                                "status":"",
                                "auditUserId":"",
                                "auditDate":"",
                                "auditStatus":"",
                                    "auditFirst":"",
                                "auditMessageId":"",
                                "auditMessage":"",
                                "createDate":"",
                                "updateDate":"",
                },
          		"identityHistory":[{
                                "id":"",
                                "userId":"",
                                "countryId":"",
                                "country":"",
                                "cardType":"",
                                "cardNo":"",
                                "expiredDate":"",
                                "cardPhoto":"",
                                "cardHandhold":"",
                                "status":"",
                                "auditUserId":"",
                                "auditDate":"",
                                "auditStatus":"",
                                "auditMessageId":"",
                                "auditMessage":"",
                                "createDate":"",
                                "updateDate":"",
                }]
            }
            "msg":"success","status":"200"
     * }
     * */
    identityAuthenticationItem(params = {}) {
        return this.Api.get('/security/overseas/identity-detail', params);
    }

    /**
     *  审核身份认证信息
     *  params{
     *      "id":"123456",
            "auditStatus":"APPROVED"
            "auditMessageId":"1",
            "auditMessage":"ok"
     *  }
     *
     *  return{
     *      "msg": "success",
            "status": "200"
     *  }
     * */
    identityAuthenticationAudit(params = {}, header) {
        return this.Api.get('/security/overseas/identity-audit', params, header)
    }

    /**
     * 获取居住认证信息列表
     * params{
     *      "status":"INIT|FINISH",
           "pageNo":0,
           "pageSize":10
     * }
     * return{
     *      "data": {
            "pageNo": 1,
            "pageSize": 10,
            "pageNum": 2,
            "list": [
                {
                      "id":"",
                      "userId":"",
                      "countryId":"",
                      "country":"",
                      "city":"",
                      "address":"",
                      "postcode":"",
                      "residencePhoto":"",
                      "residenceTranslate":"",
                      "status":"",
                      "auditUserId":"",
                      "auditDate":"",
                      "auditStatus":"",
                      "auditFirst":"",
                      "auditMessageId":"",
                      "auditMessage":"",
                      "createDate":"",
                      "updateDate":"",
                }
            ]
        },
        "msg": "success",
        "status": "200"
     * }
     * */
    residenceAuthenticationList(params = {}) {
        return this.Api.get('/security/overseas/residences', params)
    }

    /**
     * 获取身份认证信息详情
     * params{
     *    "id":"111"
     * }
     *
     * return{
     *      "data":{
      		"basicInfo":{
                "firstName":"jack",
      			"middleName":"jack",
                "lastName":"Jack",
                "gender":"male|female",
                "birthday":"2015-01-01"
                "countryId":"1"
            },
      		"identityInfo":{
                            "id":"",
                            "userId":"",
                            "countryId":"",
                            "country":"",
                            "city":"",
                            "address":"",
                            "postcode":"",
                            "residencePhoto":"",
                            "residenceTranslate":"",
                            "status":"",
                            "auditUserId":"",
                            "auditDate":"",
                            "auditStatus":"",
                            "auditFirst":"",
                            "auditMessageId":"",
                            "auditMessage":"",
                            "createDate":"",
                            "updateDate":"",
            },
      		"identityHistory":[{
                            "id":"",
                            "userId":"",
                            "countryId":"",
                            "country":"",
                            "city":"",
                            "address":"",
                            "postcode":"",
                            "residencePhoto":"",
                            "residenceTranslate":"",
                            "status":"",
                            "auditUserId":"",
                            "auditDate":"",
                            "auditStatus":"",
                            "auditFirst":"",
                            "auditMessageId":"",
                            "auditMessage":"",
                            "createDate":"",
                            "updateDate":"",
            }]
        }
        "msg":"success","status":"200"
     * }
     * */
    residenceAuthenticationItem(params = {}) {
        return this.Api.get('/security/overseas/residence-detail', params)
    }

    /**
     * 审核居住认证信息
     * params{
     *    "id":"123456",
          "auditStatus":"APPROVED"
          "auditMessageId":"1"
          "auditMessage":"ok"
     * }
     *returns{
     *    "msg": "success",
          "status": "200"
     * }
     * */
    residenceAuthenticationAudit(params = {}, header) {
        return this.Api.get('/security/overseas/residence-audit', params, header);
    }

    //获取审核记录详情
    userIdentificationInfo(params = {}) {
        return this.Api.get('/security/overseas/userIdentificationInfo', params);
    }

    //获取审核记录
    userIdentificationHistory(params = {}) {
        return this.Api.get('/security/overseas/userIdentificationHistory', params);
    }

    //标记为失效
    auditUserIdentifyLimit(params = {}, header) {
        return this.Api.get('/security/overseas/auditUserIdentifyLimit', params, header);
    }
}