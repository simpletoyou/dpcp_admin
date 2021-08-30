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
            "version": "",
            "device": "ANDROID",
            "updateFlag": "NO",
            "message": "",
            "createTime": moment().utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
        };
    }

    submit() {
        if ($.trim(this.form.version) === '') {
            window.toast('请输入APP版本号');
            return;
        }
        if ($.trim(this.form.message) === '') {
            window.toast('请输入更新内容');
            return;
        }

        this.service.appcreate(this.form).then(rep => {
            if (rep.code === '100200') {
                window.toast('添加成功', {
                    callback() {
                        window.location.hash = 'notice/applist';
                    }
                });
            } else {
                window.toast(rep.msg);
            }
        });
    }

}


export default CreateController;
