import angularUiTree from 'angular-ui-tree';

import menusData from './testdata/data';

let tool;

class CommonmenuController {
    constructor($location, $rootScope, $scope, $window, $state, treeFactory, treeConfigFactory, commonSvc,$cookies) {
        'ngInject';
        tool = treeFactory;

        this.commonSvc = commonSvc;

        this.$window = $window;
        this.$location = $location;
        this.$scope = $scope;
        this.$cookies = $cookies;
        this.name = 'commonmenu';
        this.loading = true;
        this.path = null;
        this.menuList = null;

        this.role = this.$cookies.get('role');

        this.treeConfig = treeConfigFactory.getData();

        // 权限控制
        let urlArr = window.$role.filter(item => {
            return item.level === 1
        }).map(item =>{
            return '/' + item.menuModule
        })
        
        //增加发布公告全员可用
        urlArr.push('/notice/list')
        urlArr.push('/notice/applist')
        urlArr.push('/notice/appcreate')
        urlArr.push('/notice/add')
        urlArr.push('/notice/create')
        urlArr.push('/notice/member')
        urlArr.push('/notice/alist')
        urlArr.push('/notice/iconlist')
        urlArr.push('/notice/iconadd')
        urlArr.push('/trade/guojing')
        urlArr.push('/trade/guojingAdmin')
        urlArr.push('/trade/C2C')
        // urlArr.push('/setting/reward')
        // urlArr.push('/setting/calculationConfig')
        // urlArr.push('/trade/awardRecord')

        for(let i of Object.keys(this.treeConfig)) {
            let item = this.treeConfig[i]
            // console.log(item)
            item.nodes.forEach(node => {
                let isInUrlArr = urlArr.some(url => {
                    let realUrl = url.replace(':', '')
                    
                    if (node.pattern) {
                        return node.pattern.test(realUrl) || node.url === url
                    } else {
                        return node.url === url
                    }
                })
                node.isInUrlArr = isInUrlArr
            })
        }
        // 权限控制end







        $rootScope.$on('$locationChangeSuccess', this.changePage.bind(this));
        if(this.role!=='ADMIN'){
            $rootScope.$on('$stateChangeStart', this.changePageStart.bind(this));
        }



        window.setTimeout(() => {
            this._fetchUnvefifed();
        });

    }


    changePage(){
        this.path = this.$location.path();
        let currentNav;
        if(this.treeConfig[this.path]){
            currentNav = this.treeConfig[this.path];
        }else{
            currentNav = this.getParent();
        }

        console.log('currentNav',currentNav)

        if(currentNav && currentNav.nodes){
            this.menuList = currentNav.nodes;
        }
        console.log('this.menuList',this.menuList)
        for(let i of this.menuList) {
            if(i.title === '参数配置' || i.title === '产品文档') {
                i.isInUrlArr = true
            }
        }

    }

    getParent(list){
        // 找相同的那一项
        return _.find(list || this.treeConfig, item=> {
            if(item.nodes){
                return this.getParent(item.nodes)
            }else{
                if (item.pattern) {
                    return item.pattern.test(this.path);
                } else {

                    return this.path === item.url ;//&& item.role === this.role;
                }
            }
        });
    }


    /**
     * 如果没改密码、设置谷歌验证 不能进入业务页面
     * */
    changePageStart(event,toState,toParams,fromState,fromParams){
        let boundGoogle = window.localStorage.getItem('bound-google');
        let setPwdFlag = window.localStorage.getItem('set-pwd-flag');


        if(boundGoogle !=='true'){
            this.$location.path('/account/google');
            return
        }

        if(setPwdFlag !=='true'){
            this.$location.path('/account/set-pwd');
        }
    }


    /**
     * 获取未审核消息个数
     * @private
     */
    _fetchUnvefifed() {
        return false
        let that = this;
        function loop() {
            that.commonSvc.unverifyNums().then(rep => {
                if(rep.code === window.CODE.SUCCESS){
                    let data = rep.data;
                    setDomKyc(data.identificationInitNum, data.residenceInitNum);
                    setDomWithdraw(data.withdrawCoinMap);
                }else{
                    window.toast(rep.msg);
                }
            });
        }

        loop();

        /**
         * 向全局加上更新未验证
         */
        this.$scope.$root.updateMenuUnverifyNum = function () {
            loop();
        };

        // $(document).off('tree.updateUnverifyNum').on('tree.updateUnverifyNum', () => {
        //     loop();
        // });

        let $menuContainer = $('.menu-container');

        function setDomKyc(identifyNum, addressNum, coinNumMap) {
            let kycTotalNum = identifyNum + addressNum;

            let $kyc = $menuContainer.find('a[value="kyc"]');
            let $kycIdentify = $menuContainer.find('a[value="kyc-identity"]');
            let $kycAddress = $menuContainer.find('a[value="kyc-address"]');


            if (kycTotalNum > 0) {
                $kyc.find('em.menu-no').remove();
                $kyc.append('<em class="menu-no">' + kycTotalNum + '</em>');
            }

            if (identifyNum > 0) {
                $kycIdentify.find('em.menu-no').remove();
                $kycIdentify.append('<em class="menu-no">' + identifyNum + '</em>');
            }

            if (addressNum > 0) {
                $kycAddress.find('em.menu-no').remove();
                $kycAddress.append('<em class="menu-no">' + addressNum + '</em>');
            }

        }

        function setDomWithdraw(coinMap) {
            let $dom;
            let total = 0;
            $.map(coinMap, (num, key) => {
                if (num > 0) {
                    $dom = $menuContainer.find('a[value="withdraw-' + key + '"]');
                    $dom.find('em.menu-no').remove();
                    $dom.append('<em class="menu-no">' + num + '</em>');
                    total = total + num;
                }
            });
            if (total > 0) {
                let $coinTotal = $menuContainer.find('a[value="coin-manage"]');
                $coinTotal.find('em.menu-no').remove();
                $coinTotal.append('<em class="menu-no">' + total + '</em>');
            }
        }

    }

}

export default CommonmenuController;
