export default class accountcollectSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };


    userAcBank(params) {
        return this.Api.post('/user/userAcBank', params);
    }
  

}