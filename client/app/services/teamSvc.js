export default class teamSvc {
  constructor(Api) {
      'ngInject';
      this.Api = Api;
  };

//   查看申请绑定列表
  getTeamRelationList(params) {
      return this.Api.get('/member-operate/getTeamRelationList', params);
  };
// 修改绑定状态
  manageUserApplyBind(params) {
    return this.Api.get('/member-operate/manageUserApplyBind', params);
};

//查看绩效
    getTeamPerformance(params) {
        return this.Api.get('/member-operate/getTeamInfo', params);
    };
//查看个人详情
    getTeamDetails(params){
        return this.Api.get('/member-operate/getTeamInfoDetail', params);
    };
}

