/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import moment from 'moment';
import config from '../config';
import confirm from '../../../components/confirm/confirm';

class AddController {
    /**
     *
     * @param $scope
     */
    constructor($scope, $http, noticeSvc, $cookies, $attrs, Upload) {
        "ngInject";
        this.$http = $http;
        this.$scope = $scope;
        this.service = noticeSvc;
        this.$cookies = $cookies;
        this.moment = moment;
        this.config = config;

        this.$scope.imgs = {
            lock: require('./img/upload.png'),
        };

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
        this.name = "";
        this.form = {
            "title": "",
            "imageTag": "",
            "img": "",
            "name": "",
        };

        this.init();
    }

    init() {
        UEInit()
        UE.getEditor('myEditor');
    }
    uploadFile(file, errFile) {
        let formdata = new FormData();
        formdata.append("file", file);
        this.$http({
            url: "/exchange_manager/assetIcon/upload",
            encType: 'multipart/form-data',
            data: formdata,
            method: 'POST',
            headers: this.getAuthHeader(),
        }).then(rep => {
            this.isLoading = false;
            if (rep.data.code === window.CODE.SUCCESS) {
                this.name = '/icon/' + rep.data.data.newFileName;
            } else {
                window.toast(rep.data.msg);
            }
        })
    }
    getAuthHeader(header) {
        let headers = {
            'Content-Type': undefined
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

    catchErrFileError(errFile) {

        //上传数量总线制
        if (this.formPics && this.formPics.length >= this.picMax) {
            return {
                data: true,
                msg: '上传图片最大数量为' + this.picMax + '张'
            }
        }

        //本身错误信息
        let errInfo = {
            data: false,
            msg: ''
        };
        if (errFile && errFile.length > 0) {
            switch (errFile[0]['$error']) {
                case 'pattern':
                    errInfo = {
                        data: true,
                        msg: '上传的图片类型只能是 jpg,jpeg,png'
                    };
                    break;
                case 'minWidth':
                    errInfo = {
                        data: true,
                        msg: '上传的图片最小宽高为 640*640'
                    };
                    break;
                case 'minHeight':
                    errInfo = {
                        data: true,
                        msg: '上传的图片最小宽高为 640*640'
                    };
                    break;
                case 'maxSize':
                    errInfo = {
                        data: true,
                        msg: '上传图片最大的值为5M'
                    };
                    break;
                default:
                    break;
            }
            return errInfo;
        }
    }

    removePic(e, index) {
        if (confirm("确定要移除此图片吗？")) {
            this.formPics.splice(index, 1);
        }
        e && e.stopImmediatePropagation();
    }

    viewLarge(path) {
        this.imageBox.isShow = 1;
        this.imageBox.imagesrc = path;
    }

    closeLargeView() {
        this.imageBox.isShow = 0;
        this.imageBox.imagesrc = null;
    }

    submit() {
        if ($.trim(this.form.title) === '') {
            window.toast('请输入资产代码');
            return;
        }


        let param = {
            asset: this.form.title,
            newfilename: this.name,
        };

        this.service.iconAdd(param).then(rep => {
            if (rep.code === '100200') {
                window.toast('添加成功', {
                    callback() {
                        window.location.hash = 'notice/iconlist';
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

}


export default AddController;
