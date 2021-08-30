import config from '../config';
// import coinConfig from '../../../common/coinConfig';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, $http, hatchSvc, $cookies, Upload, $attrs, $uibModal, $location, $state) {
        "ngInject";
        this.$http = $http;
        this.$scope = $scope;
        this.service = hatchSvc;
        this.$cookies = $cookies;
        this.upload = Upload;
        this.nameVal = $attrs['name'] || "file";
        this.$uibModal = $uibModal;
        this.$location = $location;

        this.airlist = null;

        this.config = config;
        this.isLoading = false;
        this.pageSize = config.PAGE_SIZE;
        this.totalNum = 0;
        this.$scope.beginTime = '';
        this.$scope.endTime = '';
        // 时间戳，防止页数和展示数据不一致
        this.timeStamp = 0;

        // this.$scope.keyWord = 'id';
        // this.$scope.keyWordText = null;
        this.$scope.coinList = $scope.$root.$coinList;;
        this.$scope.statusList = [{
            label:'成功',value:1
        },{
            label:'失败',value:0
        }];
        this.status="";

        // 搜索选项
        this.$scope.excelFile = '';
        this.$scope.assetCode = '';
        this.$scope.amount = '';
        this.$scope.riskUid = '';
        this.$scope.type1 = '锁仓';
        this.$scope.region1 = '币币区';
        this.$scope.type2 = '锁仓';
        this.$scope.region2 = '币币区';

        // 结束时间最小值
        this.$scope.typeList = [
            { name: '币币区', enname: 'MASTER' }
        ];
        this.$scope.airDrop = [
            { name: '锁仓', enname: 'LOCKING' }
            , { name: '可用', enname: 'AVAILABLE' }
            , { name: '限制可用', enname: 'LOCKING_AVAILABLE' }

        ];
        this.$scope.disabledEndDate = true;
        this.totalList = [];
        this.assetCodes = '';
        this.condition = {
            pageSize: config.PAGE_SIZE,
            pageNo: 1,
            assetCode: '',
            uid: '',
            batchNo: '',
            status:'',
        };
        this.form = {
            excelFile: '',
            assetCode: 'OMF',
            amount: '',
            riskUid: '',
            type: '',
            region: '',
        }
        this.form1 = {
            excelFile: '',
            assetCode: 'BTC',
            riskUid: '',
            type: '',
            region: '',
        }
        this.fetchList();

    }
    pageChanged() {
        //带参数的查询
        this.fetchList();
    }

    /**
     * 获取列表
     * 带参数的搜索
     */
    fetchList() {
        let param = Object.assign({}, this.condition);
        if(this.status=='成功') {
            param.status=1;
        } else if(this.status=='失败') {
            param.status=0;
        } 
        this.mergeSearch(param);
        let timeStamp = new Date().valueOf();
        this.timeStamp = timeStamp;
        this.isLoading = true;
        this.service.queryPage(param).then(rep => {
            this.isLoading = false;
            if (this.timeStamp !== timeStamp) {
                return;
            }
            if (rep.code === window.CODE.SUCCESS) {
                this.airlist = rep.data.list;
                this.totalNum = rep.data.pageNum * this.pageSize;
            } else {
                window.toast(rep.msg);
            }
        })
    }
    getStatistic() {
        let params = Object.assign({ isUpdate: true }, this.condition);
        this.service.getStatistics(params).then(rep => {
            if (rep.code === window.CODE.SUCCESS) {
                this.totalList = rep.data;
            } else {
                window.toast(rep.msg);
            }
        })
    }


    //查看个人信息
    searchInfo(data) {
        this.userid = data;
        this.$location.url('/commonusers/personalinfo?uid=' + this.userid);
    }
    /**
     * 合并搜索选项
     */
    mergeSearch(param) {
        if (this.$scope.uId) {
            if (/@/.test(this.$scope.uId)) {
                param.email = this.$scope.uId;
            } else {
                param.uId = this.$scope.uId;
            }
        }

        if (this.$scope.beginTime instanceof Date) {
            param.startDate = this.$scope.$root.moment(this.$scope.beginTime).format('YYYY-MM-DD HH:mm:ss');
        }
        if (this.$scope.endTime instanceof Date) {
            param.endDate = this.$scope.$root.moment(this.$scope.endTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
    /**
     * 改变币的种类
     */
    uploadFile(file) {
        this.form.excelFile = file;
    }
    uploadFiles(file) {
        this.form1.excelFile = file;
    }
    updateAirs() {
        if(this.$scope.type2=='锁仓') {
            this.form1.type = 'LOCKING'
        } else if(this.$scope.type2=='可用') {
            this.form1.type = 'AVAILABLE'
        } else {
            this.form1.type = 'LOCKING_AVAILABLE'
        }
        if(this.$scope.region2=='币币区') {
            this.form1.region = 'MASTER'
        } else {
            this.form1.region = 'HATCH'
        }
        let formdata = new FormData();
        formdata.append("excelFile", this.form1.excelFile);
        formdata.append("assetCode", this.form1.assetCode);
        formdata.append("riskUid", this.form1.riskUid);
        formdata.append("type", this.form1.type);
        formdata.append("region", this.form1.region);
        this.$http({
            url: "/exchange_manager/airdrop/doAirdrop-diff",
            // url: "http://manager.smt-ex.com/exchange_manager/airdrop/doAirdrop-diff",
            encType: 'multipart/form-data',
            data: formdata,
            method: 'POST',
            headers: this.getAuthHeader(),
        }).then(rep => {
            this.isLoading = false;
            if (rep.code === window.CODE.SUCCESS) {
                window.toast(rep.msg);
            } else {
                window.toast(rep.data.msg);
            }
        })
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
    cs() {

        let aa = document.querySelector('#region').value();
        return false
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
    /**
     * 日期起始时间变化
     * @param {Date | *} beginTime
     */
    changeStartDate(beginTime) {
        if (beginTime instanceof Date) {
            this.$scope.min = this.$scope.$root.moment(beginTime).add(1, 'days').format('YYYY-MM-DD');
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = false;
        } else {
            this.$scope.endTime = '';
            this.$scope.disabledEndDate = true;
        }
    }

    changeEndDate(endTime) { }
}


export default ListController;
