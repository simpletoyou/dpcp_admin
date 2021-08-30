export default class {

    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    userAcBank(params) {
        return this.Api.get('/currency/account/user-accounts', params);
    }


}