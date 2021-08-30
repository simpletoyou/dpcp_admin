export default class agentAccountSvc {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  }
  //添加项目方账户
  addAccount(params = {}, header) {
    return this.Api.post('/tripartiteConfig/createTripartiteAccount', params, header);
  }
  //查询项目方账户
  getAccount(params = {}) {
    return this.Api.get('/tripartiteConfig/getAllTripartiteAccount', params);
  }
  //撤销或启用用户
  setAccountStatus(params = {}, header) {
    return this.Api.get('/tripartiteConfig/operateTripartiteAccount', params, header);
  }
  //重置用户密码
  setAccountPwd(params = {}, header) {
    return this.Api.get('/tripartiteConfig/resetTripartiteAccount', params, header);
  }
  // 查询用户权限
  getUserRole(params = {}) {
    return this.Api.get('/tripartiteConfig/getTmsRight', params);
  }
  //设置用户权限
  setUserRole(params = {}) {
    return this.Api.post('/tripartiteConfig/setTmsRight', params);
  }
}