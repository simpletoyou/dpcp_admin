// import config from '../config';
import mathTool from '../../../common/mathTool';

import passwordDialog from '../passwordDialog.html';
import confirm from "../../confirm/confirm";
import './list.less';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, $http, settingsSvc, $uibModal, $location, $cookies) {
        "ngInject";
        this.$http = $http;
        this.$scope = $scope;
        this.service = settingsSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;
        this.$scope.imgs = {
            lock: require('./img/upload.png'),
        };
        this.name = '';
        this.data = {
            status: [
                { value: 'INIT', label: '初始化' },
                { value: 'LISTED', label: '交易对开' },
                { value: 'DELISTED', label: '交易对关' }
            ],
            type: [
                { value: 'COIN', label: 'COIN' },
                { value: 'CASH', label: 'CASH' },
            ]
        };

        this.allChainList = [{name:'ERC20','idx':0},{name:'TRC20','idx':1},{name:'BEP20','idx':2},{name:'Heco','idx':3},{name:'ONG','idx':4}];
        this.currentList = []





        this.form = {
            assetCode: '',
            brokerId: 10003,
            status: 'INIT',     // 币种默认状态
            name: '',

            modelKey: 'AVAILABLE_MODEL_KEY',//选择模型,默认第一个--可用模型
            staticFreedRate: '',//静态释放比例
            staticFreedUpperLimit: '',//静态释放上限
            dynamicDirectPush: '',//直推比例
            // dynamicNormalUser: '',//普通用户比例
            dynamicPartner: '',//合伙人比例
            dynamicSuperNode: '',//超级节点比例
            availableParameter: 0,//可用参数
            miningPoolParameter: '',//矿池参数

            // 选填
            currencyType: 'COIN',   // 币种类型，默认coin，暂时都是COIN类型
            supplyAmount: '33333333333',    // 官方流通量，暂时不用
            totalAmount: '55555555555555',
            minPrecision: 8,


            description: '',
            webUrl: '',
            // coinImg: ''
            chainList: []//受支持公链列表
        }
    }

    //判断公链是否已存进this.currentList，是的话取消选中，否则加入
    contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return i;
            }
        }
        return false;
    }

    // 点击公链触发事件
    Choose(val) {
        if (this.contains(this.currentList,val.name)===false) {
            this.currentList.push(val.name)
            
        } else {
            let idx = this.contains(this.currentList,val.name)
            this.currentList.splice(idx,1)
            
        }
        console.log('currentList', this.currentList)
    }

    
    uploadFile(file, errFile) {
        let formdata = new FormData();
        formdata.append("file", file);
        this.$http({
            url: "/exchange_manager/assetIcon/upload",
            encType: 'multipart/form-data',
            data: formdata,
            method: 'POST',
            headers: this.getAuthHeader(),
        }).then(rep => {
            this.isLoading = false;
            if (rep.data.code === window.CODE.SUCCESS) {
                this.name = '/icon/' + rep.data.data.newFileName;
            } else {
                window.toast(rep.data.msg);
            }
        })
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
    submit() {
        this.form.chainList = this.currentList
        console.log('this.form.chainList',this.form.chainList)

        let that = this;
        if ($.trim(this.form.assetCode) === '') {
            window.toast('请输入币种代码');
            return;
        }


        // if ($.trim(this.form.status) === '') {
        //     window.toast('请选择币种状态');
        //     return;
        // }

        if ($.trim(this.form.name) === '') {
            window.toast('请输入币种名称');
            return;
        }

        if ($.trim(this.form.modelKey) === '') {
            window.toast('请选择模型');
            return;
        }


        if (!this.form.chainList.length) {
            window.toast('请选择币种所支持公链');
            return;
        }
        

        if (this.form.modelKey == 'AVAILABLE_MODEL_KEY' && $.trim(this.form.availableParameter) === '') {
            window.toast('请输入可用参数');
            return;
        }


        if (this.form.modelKey == 'AVAILABLE_MODEL_KEY' && $.trim(this.form.availableParameter)>100) {
            window.toast('充值可用比例不能大于100');
            return;
        }

        if ($.trim(this.form.staticFreedRate) === '') {
            window.toast('请输入静态释放比例');
            return;
        }

        if ($.trim(this.form.staticFreedUpperLimit) === '') {
            window.toast('请输入静态释放上限');
            return;
        }
        if ($.trim(this.form.dynamicDirectPush) === '') {
            window.toast('请输入直推比例');
            return;
        }

        if ($.trim(this.form.dynamicPartner) === '') {
            window.toast('请输入合伙人比例');
            return;
        }

        if ($.trim(this.form.dynamicSuperNode) === '') {
            window.toast('请输入超级节点比例');
            return;
        }

        // if ($.trim(this.form.description) === '') {
        //     window.toast('请输入币种描述');
        //     return;
        // }

        // if ($.trim(this.form.webUrl) === '') {
        //     window.toast('请输入币种官网');
        //     return;
        // }

        if ($.trim(this.name) === '') {
            window.toast('请上传币种图标');
            return;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        let param = {
            assetCode: this.form.assetCode.toUpperCase(),
            brokerId: 10003,
            status: this.form.status,     // 币种默认状态
            name: this.form.name,
            icon: this.name,
            // 选填
            currencyType: this.form.currencyType,   // 币种类型，默认coin，暂时都是COIN类型
            supplyAmount: this.form.supplyAmount,    // 官方流通量，暂时不用
            totalAmount: this.form.totalAmount,
            minPrecision: this.form.minPrecision,
            
            modelKey: this.form.modelKey,
            staticFreedRate: this.form.staticFreedRate,
            staticFreedUpperLimit: this.form.staticFreedUpperLimit,
            dynamicDirectPush: this.form.dynamicDirectPush,
            dynamicNormalUser: 0,
            dynamicPartner: this.form.dynamicPartner,
            dynamicSuperNode: this.form.dynamicSuperNode,
            availableParameter: this.form.availableParameter,
            miningPoolParameter: 100 - this.form.availableParameter,
            tokenType: this.form.chainList
        };


        if ($.trim(this.form.description) === '') {
            param.description = '0';
        } else {
            param.description = this.form.description;
        }
        if ($.trim(this.form.webUrl) === '') {
            param.webUrl = '0';
        } else {
            param.webUrl = this.form.webUrl;
        }

        if (this.form.modelKey == 'LOCKING_AVAILABLE_MODEL_KEY' && $.trim(this.form.availableParameter) === '') {
            param.availableParameter = '0';
        } 
        if (this.form.modelKey == 'LOCKING_AVAILABLE_MODEL_KEY' && $.trim(this.form.miningPoolParameter) === '') {
            param.miningPoolParameter = '0';
        }



        this.$scope.$$ok = function (password) {
            window.toast('请稍候...');
            that.service.coinAdd(param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === '100200') {
                    window.toast('添加成功', {
                        callback() {
                            window.location.reload();
                        }
                    });
                } else {
                    window.toast(rep.msg);
                }
            });
            modalInstance.dismiss('ok');
        };

        this.$scope.$$cancel = function () {
            modalInstance.dismiss('cancel');
        };

    }

}


export default ListController;
