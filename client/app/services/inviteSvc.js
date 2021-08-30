/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/28
 */

export default class inviteSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 注册礼包奖励列表
     * @param params
     */
    rewardConfigQuery(params = {}) {
        /**
         * req
         *
         *
         */
        return this.Api.get('/invite/invite-reward-config-query', params, null, false);
    }

    /**
     * 邀请好友奖励列表
     */
    configUpdate(params = {}, header = {}) {
        /*
        req:

         */
        return this.Api.get('/invite/invite-reward-config', params, header, false);
    }

    /**
     * 查询活动状态
     * @param params
     * @param header
     */
    queryActivityStatus(params = {}, header = {}) {
        /*
        req:
            activityName: '',
            status: ''  // ON/OFF
         */
        return this.Api.get('/invite/invite-config-query', params, header, false);
    }

    /**
     * 更新活动状态
     * @param params
     * @param header
     */
    updateActivityStatus(params = {}, header = {}) {
        /*
        req:
            activityName: '',
            status: ''  // ON/OFF
         */
        return this.Api.get('/invite/invite-config', params, header, false);
    }

    /**
     * 发放奖励
     * @param params
     * @param header
     */
    rewardGrant(params = {}, header = {}) {
        /*
        req:
            activityName: '',
            uid: ''
         */
        return this.Api.get('/invite/reward-grant', params, header, false);
    }

}
