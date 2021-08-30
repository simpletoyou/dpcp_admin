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
        this.type = "NEWS";
        this.isLoading = false;

        this.condition = {
            pageNo: 1,
            pageSize: 10,
            type: this.type
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
        this.service.iconList({}).then(rep => {
            this.isLoading = false;
            this.list = rep.data;
        })
    }


    /**
     * 删除
     * @param id
     */
    remove(noticeId) {
        let that = this;
        confirm('确定要删除吗?', () => {
            this.service.iconDelete({
                id: noticeId
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

    /**
     * 发布
     * @param id
     */
    release(id) {
        let that = this;
        confirm('确定发布吗?', () => {
            this.service. apprelease({
                id: id,
                status : 'VALID'
            }).then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    window.toast('发布成功', {
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
