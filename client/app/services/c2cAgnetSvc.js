export default class c2cAgentSvc {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  }
  /**
   * c2c查询申请成为代理接口
   */
  userApplyMemberInfo(params = {}) {
    return this.Api.get('/goldenTransaction/get-userApplyMemberInfo', params);
  }

  // c2c审核通过还是拒绝
  updataUserApplyMembe(params = {}, header) {
    return this.Api.get('/goldenTransaction/operate-userApplyMember', params, header);
  }

  //C2C取消会员身份
  removeMembe(params = {}, header) {
    return this.Api.get('/goldenTransaction/operate-userCancelMember', params, header);
  }

}