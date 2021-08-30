/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/28
 */

export default class noticeSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 列表
     * @param params
     * @returns {*}
     */
    list(params = {}) {
        return this.Api.get('/noticeApi/noticeList', params, null, false);
    }

    /**
     * 获取图片地址
     * @param params
     * @returns {*}
     */
    img(params = {}) {
        return this.Api.get('/common/photo', params, null, false);
    }

    /**
     * 列表
     * @param params
     * @returns {*}
     */
    alist(params = {}) {
        return this.Api.get('/coinInformation/coinInfoList', params, null, false);
    }

    /**
     * app列表
     * @param params
     * @returns {*}
     */
    applist(params = {}) {
        return this.Api.get('/app/list', params, null, false);
    }

    /**
     * app创建
     * @param params
     * @returns {*}
     */
    appcreate(params = {}) {
        return this.Api.post('/app/publish', params, null, false);
    }

    /**
     * app删除
     * @param params
     * @returns {*}
     */
    appremove(params = {}) {
        return this.Api.get('/app/delete', params, null, false);
    }


    /**
     * app启用
     * @param params
     * @returns {*}
     */
    apprelease(params = {}) {
        return this.Api.get('/app/set', params, null, false);
    }

    /**
     * 添加
     * @param param
     */
    add(param = {}) {
        /*
         "userId": 1,
         "nickname": "admin",
         "topStatus": "YES",
         "title": "公告标题",
         "content": "公告内容"
         */
        //
        return this.Api.post('/noticeApi/noticeCreate', param, null, false);
    }

    /**
     * 添加币种资讯
     * @param param
     */
    create(param = {}) {
        /*
         "userId": 1,
         "nickname": "admin",
         "topStatus": "YES",
         "title": "公告标题",
         "content": "公告内容"
         */
        //
        return this.Api.post('/coinInformation/noticeCreate', param, null, false);
    }

    /**
     * 移除公告
     * @param param
     * @returns {*}
     */
    remove(param = {}) {
        return this.Api.get('/noticeApi/noticeDelete', param, null, false);
    }

    /**
     * 置顶
     * @param param
     * @returns {*}
     */
    top(param = {}) {
        /*
         request param
         {
         "noticeId":1,
         "topStatus":"YES"
         }
         */
        return this.Api.get('/noticeApi/top', param, null, false);
    }

    /**
     * 公告详情
     * @param param
     * @returns {*}
     */
    detail(param = {}) {
        /*
         request param
         noticeId
         */

        /*
         response
         {
         "noticeId":200,
         "userId":1,
         "nickname":"admin",
         "topStatus":"YES",
         "createTime":1,
         "title":"公告标题",
         "content":"公告内容"
         }
         */
        return this.Api.get(`/noticeApi/noticeDetail`, param, null, false);
    }

    /**
     * 图标列表
     * @param param
     * @returns {*}
     */
    iconList(param = {}) {
        return this.Api.post('/assetIcon/getList', param, null, false);
    }

    /**
     * 删除图标
     * @param param
     * @returns {*}
     */
    iconDelete(param = {}) {
        return this.Api.post('/assetIcon/delete', param, null, false);
    }
    /**
     * 修改图标
     * @param param
     * @returns {*}
     */
    iconUpdate(param = {}) {
        return this.Api.post('/assetIcon/update', param, null, false);
    }
    /**
     * 添加图标
     * @param param
     * @returns {*}
     */
    iconAdd(param = {}) {
        return this.Api.post('/assetIcon/add', param, null, false);
    }

    /**
     * 上传图标
     * @param param
     * @returns {*}
     */
    iconUpload(param = {}) {
        return this.Api.post('/assetIcon/upload', param, null, false);
    }

}
