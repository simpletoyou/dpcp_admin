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
    constructor($scope, noticeSvc) {
        "ngInject";

        this.$scope = $scope;
        this.service = noticeSvc;

        this.moment = moment;
        this.config = config;

        this.form = {
            "uid": 1,
            "nickName": "admin",
            "topStatus": "NO",
            "title": "",
            "content": "",
            "createTime": moment().utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
        };

        this.init();
    }

    init() {

    }

    submit() {

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
