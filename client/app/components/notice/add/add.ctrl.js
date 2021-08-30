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
    constructor($scope, noticeSvc, $cookies, $attrs, Upload) {
        "ngInject";

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
            "uid": 1,
            "nickname": "admin",
            "topStatus": "NO",
            "msgType": "NEWS",
            "title": "",
            "content": "",
            "imageTag": "",
            "img": "",
            "name":"",
            "createTime": moment().utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
        };

        this.init();
    }

    init() {
        UEInit()
        UE.getEditor('myEditor');
    }
    uploadFile(file, errFile) {
        console.log('this is input file',file)
        let errInfo = this.catchErrFileError(errFile);
        if (errInfo && errInfo['data']) {
            alert(errInfo && errInfo['msg']);
            return;
        }
        if (!!file) {
            let options = {
                file: file
            }
            return this.upload.upload({
                url: '/exchange_manager/common/notice-upload',
                headers: this.getAuthHeader(),
                data: options
            }).then(res => {
                if (res.data.code == 100200) {
                    this.name ='/notice/' +  res.data.data.newFileName;
                    this.form.imageTag = res.data.data.newFileName;
                } else {
                    console.log('错误信息:', res.data.result);
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
        this.form.content = UE.getEditor('myEditor').getContent();
        if ($.trim(this.form.title) === '') {
            window.toast('请输入标题');
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
            topStatus: this.form.topStatus,
            title: this.form.title,
            imageTag: this.form.name,
            content: this.form.content,
            createTime: new Date(this.form.createTime).getTime()
        };

        this.service.add(this.form).then(rep => {
            if (rep.code === '100200') {
                window.toast('添加成功', {
                    callback() {
                        window.location.hash = 'notice/list';
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

}


export default AddController;
