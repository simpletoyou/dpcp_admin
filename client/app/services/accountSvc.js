/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-31 14:56:46
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 14:58:56
 */
/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

export default class accountSvc{
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /*
    * 获取谷歌验证码相关信息
    */
    getGoogleCode(params={}){
        return this.Api.get('/manager/googlecode-get',params);
    }


    /**
     *绑定谷歌验证码
     * */
    firstCheckGoogleCode(params = {},header){
        return this.Api.get('/manager/googlecode-firstcheck',params,header)
    }


    /**
     *获取登录信息
     * */
    fetchLoginLog(params = {},header){
        return this.Api.get('/admin/loginlog-info',params,header)
    }

}