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
    constructor($scope, lockCoinSvc) {
        "ngInject";

        this.$scope = $scope;
        this.service = lockCoinSvc;

        this.isLoading = false;

        this.condition = {
            assetCode: '',
            pageNo: 1,
            pageSize: 30
        };

        this.totalNum = 0;

        this.list = [];

        this.init();
    }

    init() {
        this.fetchList();
    }

    /**
     * 获取列表
     */
    fetchList() {
        this.isLoading = true;
        // let param = {
        //     pageNo: this.condition.pageNo,
        //     pageSize: this.condition.pageSize
        // };
        // if (this.condition.assetCode !== '') {
        //
        // }
        this.service.statList(this.condition).then(rep => {
            this.isLoading = false;
            this.list = rep.data.list;
            this.totalNum = rep.data.total;
        })
    }

    pageChanged() {
        this.fetchList();
    }

}


export default ListController;
