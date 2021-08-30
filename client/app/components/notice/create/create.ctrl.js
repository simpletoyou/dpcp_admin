/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import moment from 'moment';
import config from '../config';
import confirm from '../../../components/confirm/confirm';

class CreateController {
    /**
     *
     * @param $scope
     */
    constructor($scope, noticeSvc,$cookies, $attrs, Upload ) {
        "ngInject";

        this.$scope = $scope;
        this.service = noticeSvc;
        this.$cookies = $cookies;
        this.moment = moment;
        this.config = config;


        var vm = this;

        vm.name = 'inputUpload';
        vm.upload = Upload;
        vm.nameVal = $attrs['name'] || "file";
        vm.picMax = $attrs['picMax'] || 1;
        vm.required = $attrs['required'] || 0;
        vm.showTip = $attrs['showTip'] || 0;

        vm.imageBox = {
            "isShow": 0,
            "imagesrc": null
        }
        
        this.form = {
            "uid": 1,
            "nickname": "admin",
            "topStatus": "NO",
            "title": "",
            "num": "",
            "fundNum": "",
            "fileTag": "",
            "assetCode": "",
            "content": "",
            "infoType": "PUBLISH",
            "createTime": moment().utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
        };

        this.init();
    }

    init() {
        UEInit()
        UE.getEditor('myEditor');
    }
    uploadFile(file, errFile) {
        console.log(file, errFile);
        if (!!file) {
            let options = {
                file: file
            }
            return this.upload.upload({
                url: '/exchange_manager/common/upload-photo/private',
                headers: this.getAuthHeader(),
                data: options
            }).then(res => {
                if (res.data.code == 100200) {
                    this.form.fileTag = res.data.data.name;
                } else {
                    console.log('错误信息:', res.data.code);
                }
            }).then(response => {
                if (response && response.data && response.data.url) {
                    this.formPics.push(response.data.url);
                }
            });
        }
    }
    getAuthHeader(header) {
        let headers = {
            // 'Content-Type': "application/x-www-form-urlencoded; charset=utf-8",
            // 'accept-language': 'zh-CN'
        };
        // let account = window.localStorage.getItem('account');
        // let auth;
        // if (account) {
        //     auth = {
        //         'account-no': account
        //     };
        // }

        let token = this.$cookies.get('LOGIN_TOKEN_ADMIN');

        let auth = {};
        if (token) {
            auth.token = token;
        }

        if (header && $.isEmptyObject(header) === false) {
            auth = $.extend(auth, header);
        }
        if ($.isEmptyObject(auth) === false) {
            headers.authorization = this.stringifyHeader(auth);
        }
        return headers;
    }

    stringifyHeader(param) {
        let results = [];
        if ($.isEmptyObject(param) === true) {
            return '';
        }
        $.map(param, (value, key) => {
            results.push(`${key}=${value}`);
        });
        return results.join(',');
    }

    submit() {
        this.form.content = UE.getEditor('myEditor').getContent();
        if ($.trim(this.form.title) === '') {
            window.toast('请输入标题');
            return;
        }

        if ($.trim(this.form.assetCode) === '') {
            window.toast('请输入资产代码');
            return;
        }

        if ($.trim(this.form.createTime) === '') {
            window.toast('请输入时间');
            return;
        }

        if ($.trim(this.form.content) === '') {
            window.toast('请输入内容');
            return;
        }

        let param = {
            uid: this.form.uid,
            nickName: this.form.nickName,
            assetCode: this.assetCode,
            topStatus: this.form.topStatus,
            title: this.form.title,
            content: this.form.content,
            createTime: new Date(this.form.createTime).getTime(),
            infoType: this.form.title,
        };

        this.service.create(this.form).then(rep => {
            if (rep.code === '100200') {
                window.toast('添加成功', {
                    callback() {
                        window.location.hash = 'notice/alist';
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

}


export default CreateController;
