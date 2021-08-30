/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/27
 */

import moment from 'moment';
import config from '../config';
import confirm from '../../../components/confirm/confirm';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, noticeSvc) {
        "ngInject";

        this.$scope = $scope;
        this.service = noticeSvc;

        this.list = null;
        this.moment = moment;
        this.config = config;

        this.isLoading = false;

        this.condition = {
            pageNo: 1,
            pageSize: 10
        };

        this.totalNum = 0;

        this.init();
    }

    init() {
        this.fetchList();
    }

    pageChanged() {
        this.fetchList();
    }

    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        this.service.alist(this.condition).then(rep => {
            this.isLoading = false;
            this.list = rep.data.list;
            this.totalNum = rep.data.total;
        })
    }

    /**
     * 置顶
     * @param noticeId
     */
    toTop(noticeId) {
        let that = this;
        confirm('确定要置顶吗?', () => {
            this.service.top({
                noticeId: noticeId,
                topStatus: config.STATUS_TOP.KEY
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('置顶成功', {
                        callback() {
                            that.condition.pageNo = 1;
                            that.fetchList();
                        }
                    });
                }else{
                    window.toast(rep.msg);
                }
            });
        });
    }

    /**
     * 取消置顶
     * @param noticeId
     */
    cancelTop(noticeId) {
        let that = this;
        this.service.top({
            noticeId: noticeId,
            topStatus: config.STATUS_NOT_TOP.KEY
        }).then(rep => {
            if(rep.code === window.CODE.SUCCESS){
                window.toast('取消置顶成功', {
                    callback() {
                        that.fetchList();
                    }
                });
            }else{
                window.toast(rep.msg);
            }

        })
    }

    /**
     * 删除
     * @param noticeId
     */
    remove(noticeId) {
        let that = this;
        confirm('确定要删除吗?', () => {
            this.service.remove({
                noticeId: noticeId
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('删除成功', {
                        callback() {
                            that.fetchList();
                        }
                    });
                }else{
                    window.toast(rep.msg);
                }

            });
        });
    }

}


export default ListController;
