/**
 * 公园活动
 * 
 */
export default class cooperationSvc {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  }

  getNodeList(params) {
    return this.Api.get('/node/list', params);
  }

  setNode(params) {
    return this.Api.get('/node/set', params);
  }

  setManagePredict(params) {
    return this.Api.get('/manage/predict', params);
  }

  setManageAllot(params) {
    return this.Api.get('/manage/allot', params);
  }

  getNodeProfit(params) {
    return this.Api.get('/node/profit', params);
  }

  nodeClose(params) {
    return this.Api.get('/manage/close', params);
  }

  getBack(params) {
    return this.Api.get('/node/invest-back', params);
  }

  setrewardCaptain(params) {
    return this.Api.get('/manage/predict-rewardCaptain', params);
  }

  rewardCaptain(params) {
    return this.Api.get('/manage/rewardCaptain', params);
  }

  allotFeeInfo(params) {
    return this.Api.get('/manage/allotFeeInfo', params);
  }

  allotFee(params) {
    return this.Api.get('/manage/allotFee', params);
  }

  nodeProfitList(params) {
    return this.Api.get('/node/nodeProfitList', params);
  }

  addNodeProfit(params) {
    return this.Api.post('/node/addNodeProfit', params);
  }

  updateNodeProfit(params) {
    return this.Api.post('/node/updateNodeProfit', params);
  }
}