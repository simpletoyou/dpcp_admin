class Controller {
    constructor($rootScope, $cookies, $scope, commonSvc, $location, pathConfigFactory) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$location = $location;
        this.commonSvc = commonSvc;
        this.$cookies = $cookies;
        this.PATH_CONFIG = pathConfigFactory.getData();

        this.headerType = 0;
        this.name = 'header';
        this.email = '';
        this.showSelect = false;

        //菜单权限
        this.rolePerm = []
        if(window.$role instanceof Array){
            for(let d of window.$role){
                if(d.level === 0){
                    this.rolePerm.push(d.menuName)
                }
            }
        }

        // 保存的URL
        this.preQuery = null;

        this.addListener();
        this.needAppidURL = ['/app/desc', '/order/list', '/order/refund', '/order/settlement', '/app/infor', '/users/companylist'];

        let that = this;
        this.addEvent(document, 'click', function () {
            if (that.showSelect) {
                that.showSelect = false;
                that.$scope.$apply();
            }
        });

        this.accountNo = window.localStorage.getItem('account-no');
    };

    //返回菜单权限
    returnRolePerm(name){
        if(name == '公告发布'){
            return true
        }else{
            return this.rolePerm.indexOf(name) == -1 ? false:true
        }   
        // return true
    }

    isNeedAppidURL(path) {
        return this.needAppidURL.some((v, i, a) => {
            return v == path;
        });
    };

    parseQuery(url) {
        let ret = {};
        let a = document.createElement('a');
        a.href = url;
        if (a.hash) {
            let b = document.createElement('a');
            b.href = a.hash.replace(/^#/, '');
            if (b.search) {
                let seg = b.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
            }
        }
        ;
        return ret;
    };

    addListener() {
        const PATH_CONFIG = this.PATH_CONFIG;
        // $locationChangeStart hash变化后 页面变化前
        this.$rootScope.$on('$locationChangeStart', function (event, toState, fromUrl) {
            // 当前路径

            let pathname = window.location.pathname;
            let path = this.$location.path();

            //未登录
            if(pathname === '/login.html'){
                this.headerType = 3;
            }else{
            //已登陆，判断账户类型，展示不同header
                if(this.$cookies.get('role') === 'ADMIN'){
                    this.headerType = 4;//超级管理员
                }else{
                    this.headerType = 5;//管理员
                }

            }
        }.bind(this));
    };

    isShowSelect($event) {
        this.showSelect = true;
        $event.stopPropagation();
    };

    addEvent(obj, sEv, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(sEv, fn, false);
        } else {
            obj.attachEvent('on' + sEv, fn);
        }
    }

    exitFN() {

    }

    logout() {
        let params = {};
        let header = {
            'account-no':this.accountNo //window.localStorage.getItem('account-no')
        };
        this.commonSvc
            .logout(params,header)
            .then(data => {
                window.localStorage.removeItem('account-no');
                window.localStorage.removeItem('bound-google');
                window.localStorage.removeItem('set-pwd-flag');
                window.location.href = 'login.html';
            });
    }
}

export default Controller;
