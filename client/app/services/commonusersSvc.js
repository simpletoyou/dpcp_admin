/**
 * author liubingli
 *
 */
export default class commonusersSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    commonusers(params) {
        return this.Api.get('/user/user-list', params);
    }

    personDetailsInfo(params) {
        return this.Api.get('/security/overseas/user-detail', params);
    }

    //获取userList
    queryUserList(params){
        return this.Api.get('/security/overseas/user-list', params);
    }

    //用户详情界面重置谷歌验证
    userDetailGoogleReset(params,header){
        return this.Api.get('/user/user_googlecode-reset', params,header);
    }

    personAssets(params) {
        return this.Api.get('/asset/getUserAccounts', params);
    }

    setOperate(params) {
        return this.Api.get('/user/user-member-operate', params);
    }
    

}
