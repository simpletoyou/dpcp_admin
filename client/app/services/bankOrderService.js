export default class bankorderSVC {
    constructor(Api, Upload) {
        'ngInject';
        this.Api = Api;
        this.Upload = Upload;
    };


    uploadBankFile(params, type) {
        return this
            .Upload
            .upload({
                url: this.Api.basePath + '/recharge/uploadBankFile/' + type,
                headers: {
                    enctype: 'multipart/form-data',
                },
                data: params,
            }).then(data=> {
                let result = data && data.data;
                let status = data && data.status;
                let errorMsg = result && result.msg;
                if (status != 200) {
                    console.log('错误信息', errorMsg);
                    return;
                } else {
                    return result;
                }

            });
    }

    bankOrderList(params) {
        return this.Api.post('/recharge/bankOrderList', params);
    }


}
