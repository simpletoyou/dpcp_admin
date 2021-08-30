/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

export default class adminSvc{
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /*
    * 后台管理员列表
    */
    adminList(params={}){
        return this.Api.get('/admin/list',params);
    }

    /*
    * 后台重置密码
    * */
    setLoginPassword(params = {}, header = {}){
        return this.Api.post('/admin/login-password', params, header);
    }

    /*
    * 创建管理员
    * */
    create(params={}){
        return this.Api.post('/admin/new',params);
    }

    /*
    * 后台锁定管理员
    * */
    lockAdmin(params = {},header={}){
        return this.Api.post('/admin/lock',params,header);
    }

    /*
    * 后台解锁管理员
    * */
    unlockAdmin(params={},header={}){
        return this.Api.post('/admin/unlock',params,header);
    }


    /**
     * 重置登录密码
     * /admin/reset-login-password  入参：adminId、loginPassword  出参：无   POST请求
     * */
    resetLoginPassword(params={},header={}){
        return this.Api.post('/admin/reset-login-password',params,header)
    }

    /**
     * 重置谷歌验证
     * adminId
     * */
    resetGoogleCode(params = {},header={}){
        return this.Api.get('/manager/googlecode-reset',params,header)
    }


    /**
     * 获取登录信息
     * */
    queryOperationLog(params={}){
        return this.Api.get('/admin/operlog-query',params)
    }


//


}