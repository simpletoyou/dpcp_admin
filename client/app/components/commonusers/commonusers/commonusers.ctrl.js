/**
 * author liubingli
 */
class CommonusersController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope, commonusersSvc, enumSvc, commonSvc, $location) {
        'ngInject';
        /**
         * 注入的服务
         */
        this.$scope = $scope;
        this.commonusersSvc = commonusersSvc;
        this.enumSvc = enumSvc;
        this.commonSvc = commonSvc;
        this.options = {};
        this.$location = $location;


        this.$scope.keyWord = 'uid';
        this.$scope.keyWordText = '';

        //搜索用关键字
        this.$scope.searchkeyWord = '';
        this.$scope.searchkeyWordText = '';
        //用户搜索时间
        this.$scope.min = '';
        this.$scope.disabledEndDate = true;
        this.$scope.startDate = ''
        this.$scope.endDate = ''

        //搜索出的用户列表数据
        this.$scope.userList = []
        this.$scope.totalNum = 0
        this.$scope.pageSize = 10
        this.pageNo = 1

        this.$scope.searchHistoryList = localStorage.getItem('searchHistoryList') ? JSON.parse(localStorage.getItem('searchHistoryList')) : [];


        // this.list = null;

        // this.isLoading = true;

        // this.condition = {
        //     pageNo: 1,
        //     pageSize: 30
        // };

        // this.totalNum = 0;

        // this.init();
        this.getUserList()
        this.$scope.searchkeyWord = 'uid';
    }

    /**
     * @return {null}
     */
    // init() {
    //     this.fetchList();
    // }

    // fetchList() {

    //     let param = Object.assign({}, this.condition);
    //     if (this.$scope.keyWordText) {
    //         param[this.$scope.keyWord] = this.$scope.keyWordText.replace('.','\.');
    //     }

    //     this.isLoading = true;
    //     this.commonusersSvc.commonusers(param).then(rep => {
    //         this.isLoading = false;
    //         if(rep.code===window.CODE.SUCCESS){
    //             this.list = rep.data.list;
    //             this.totalNum = rep.data.pageNum * this.condition.pageSize;
    //         }else{
    //             window.toast(rep.msg);
    //         }
    //     });

    // }

    // pageChanged() {
    //     this.fetchList();
    // }

    // searchInfo(data) {
    //     this.userid = data;
    //     this.$location.url('/commonusers/personalinfo?uid=' + this.userid);
    // }

    //设定VIP1
    setVip(obj,status){
        this.commonusersSvc.setOperate({uid:obj.uid,memberType:status}).then(res=>{
            if(res.code === window.CODE.SUCCESS){
                window.toast(res.msg);
                this.getUserList();
            }else {
                window.toast(res.msg);
            }
        })
    }

    //返回创建时间
    returnCreateDate(date){
        // return date === '' ? this.$scope.$root.moment(date).format('YYYY-MM-DD') : ''
        let d = new Date(date)
        return this.$scope.$root.moment(d).format("YYYY-MM-DD HH:mm:ss")
    }

    //返回状态信息
    returnUserLevel(level){
        let obj = {
            LEVEL0: '未实名',
            LEVEL1: '初级实名',
            LEVEL2: '高级实名',
        }
        let l = obj[level]
        return l || ''
    }

    //返回用户状态
    returnUserState(state){
        return '正常'
    }

    //获取用户列列表
    getUserList(){
        let startdate = this.$scope.startDate instanceof Date ? this.$scope.$root.moment(this.$scope.startDate).format('YYYY-MM-DD HH:mm:ss') : ''
        let enddate = this.$scope.endDate instanceof Date ? this.$scope.$root.moment(this.$scope.endDate).format('YYYY-MM-DD HH:mm:ss') : ''



        let json = {
            pageSize: this.$scope.pageSize,
            pageNo: this.pageNo
        }
        if(startdate){
            json['startDate'] = startdate
        }
        if(enddate){
            json['endDate'] = enddate
        }
        if(this.$scope.searchkeyWord === 'uid'&&this.$scope.searchkeyWordText){
            json['uid'] = this.$scope.searchkeyWordText
        }else if(this.$scope.searchkeyWord === 'account'&&this.$scope.searchkeyWordText){
            json['email'] = this.$scope.searchkeyWordText
        }else if(this.$scope.searchkeyWord === 'fullname'&&this.$scope.searchkeyWordText){
            json['fullname'] = this.$scope.searchkeyWordText
        }
        this.commonusersSvc.queryUserList(json).then(res=>{

            if(res.code === window.CODE.SUCCESS){
                this.$scope.userList = res.data.list
                this.$scope.totalNum = res.data.total
                this.pageNo = res.data.pageNo
            }else {
                window.toast(res.msg);
            }
        })
    }

    pageChanged(pageNo){
        this.getUserList()
    }

    //点击查看用户详情
    userDetail(item){
        this.$scope.keyWordText = item.uid
        this.searchInfo()
    }


    searchInfo() {
        if (this.$scope.keyWordText) {
            let searchUrl = '/commonusers/personalinfo?' + this.$scope.keyWord + '=' + this.$scope.keyWordText;
            let itemHistory = {
                keys: this.$scope.keyWord,
                value: this.$scope.keyWordText,
                // index: this.$scope.keyWord + this.$scope.keyWordText,
                searchUrl: searchUrl
            };

            if (this.$scope.searchHistoryList.length > 0) {
                let k = 0;
                this.$scope.searchHistoryList.forEach((item) => {
                    if (item.searchUrl != itemHistory.searchUrl) {
                        k += 1;
                    }
                });
                if (k === this.$scope.searchHistoryList.length) {
                    this.$scope.searchHistoryList.unshift(itemHistory);
                }
            } else {
                this.$scope.searchHistoryList.unshift(itemHistory);
            }
            let tempArr = Array.from(new Set(this.$scope.searchHistoryList)).slice(0,5);
            let strSearchHisory = JSON.stringify(tempArr);
            localStorage.setItem('searchHistoryList', strSearchHisory);
            this.$location.url(searchUrl);
        } else {
            window.toast('请输入搜索关键字');
        }

    }
    gotoPage(url) {
        this.$location.url(url);
    }

    clearSearchHistoryList() {
        localStorage.setItem('searchHistoryList', []);
        this.$scope.searchHistoryList = [];
    }

    /**
     * 日期起始时间变化
     * @param {Date | *} startDate
     */
    changeStartDate(startDate) {
        if (startDate instanceof Date) {
            this.$scope.min = this.$scope.$root.moment(startDate).add(1, 'days').format('YYYY-MM-DD');
            this.$scope.endDate = '';
            this.$scope.disabledEndDate = false;
        } else {
            this.$scope.endDate = '';
            this.$scope.disabledEndDate = true;
        }
    }

}

export default CommonusersController;
