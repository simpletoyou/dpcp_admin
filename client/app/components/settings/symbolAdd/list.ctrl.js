import config from '../config';
import mathTool from '../../../common/mathTool';

import passwordDialog from '../passwordDialog.html';
import confirm from "../../confirm/confirm";

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, tradeControlSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = tradeControlSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.config = config;

        this.data = {
            status: [
                {value: 'INIT', label: '初始化'}, 
                {value: 'LISTED', label: '交易对开'}, 
                {value: 'DELISTED', label: '交易对关'}
            ]
        };
        this.PRICE_COIN_LIST = this.$scope.$root.$coinList;
        this.form = {
            // symbol: '',                 // 计价币种
            // name: '',                      // 交易对名称

            assetCode1: '',             // 计价币种
            assetCode2: '',             // 新加交易币种

            title: '',                  // 标题显示
            description: '',                 // 交易对描述

            status: 'INIT',                 // 状态  默认  LISTED

            minPrecision1: '8',                 // 计价币种最小精度
            minPrecision2: '8',                 // 新加交易币种最小精度

            minAmount1: '0.00000001',                 // 计价币种最小数量
            minAmount2: '0.00000001',                 // 新加交易币种最小数量

            maxAmount1: '1000000000',                 // 计价币种最大数量
            maxAmount2: '1000000000',                 // 新加交易币种最大数量

            pricePrecision: 8,                         // 新加交易币种价格精度
            amountPrecision: 4,                         // 新加交易币种数量精度
            highlightNo: 2,                         // 新加交易币种高亮位数

        };

        this.error = {
            assetCode1: '请选择计价币种',
            assetCode2: '请选择交易币种',

            // title: '请输入标题显示。如ACT/BTC',
            // description: '请输入交易对描述',

            // status: '请选择交易状态',

            // minPrecision1: '请输入计价币种最小精度',
            // minPrecision2: '请输入新加交易币种最小精度',
            //
            // minAmount1: '请输入计价币种最小数量',
            // minAmount2: '请输入新加交易币种最小数量',
            //
            // maxAmount1: '请输入计价币种最大数量',
            // maxAmount2: '请输入新加交易币种最大数量',
            pricePrecision: '请输入计价币种价格精度',
            amountPrecision: '请输入交易币种数量精度',
            highlightNo: '请输入计价币种高亮位数'
        };

    }

    submit(){
        let that = this;
        // let isNext = true;
        let form = this.form;
        let error = this.error;

        // let keys = Object.keys(form);
        //
        // keys.some((item)=>{
        //     if($.trim(form[item]) === ''){
        //         window.toast(error[item]);
        //         isNext = false;
        //         return true;
        //     }
        // });
        //
        // if(!isNext){
        //     return false;
        // }

        if ($.trim(this.form.assetCode2) === '') {
            window.toast(error.assetCode2);
            return;
        }
        if ($.trim(this.form.pricePrecision) === '') {
            window.toast(error.pricePrecision);
            return;
        }
        if ($.trim(this.form.assetCode1) === '') {
            window.toast(error.assetCode1);
            return;
        }
        if ($.trim(this.form.pricePrecision) === '') {
            window.toast(error.pricePrecision);
            return;
        }
        if ($.trim(this.form.highlightNo) === '') {
            window.toast(error.highlightNo);
            return;
        }

        let param = {
            name: this.form.assetCode1 + '_' + this.form.assetCode2,
            symbol: this.form.assetCode1 + '_' + this.form.assetCode2,
            assetCode1: this.form.assetCode1,
            assetCode2: this.form.assetCode2,

            title: this.form.assetCode2 + '/' + this.form.assetCode1,
            status: this.form.status,

            minPrecision1: this.form.minPrecision1,
            minPrecision2: this.form.minPrecision2,

            minAmount1: this.form.minAmount1,
            minAmount2: this.form.minAmount2,

            maxAmount1: this.form.maxAmount1,
            maxAmount2: this.form.maxAmount2,

            pricePrecision: this.form.pricePrecision,
            amountPrecision: this.form.amountPrecision,
            highlightNo: this.form.highlightNo
        };
        if ($.trim(this.form.description) === '') {
            param.description = '0';
        } else {
            param.description = this.form.description;
        }

        let modalInstance = this.$uibModal.open({
            template: passwordDialog,
            scope: this.$scope,
            controller() {
            }
        });

        this.$scope.$$ok = function (password) {
            if (password === '') {
                window.toast('请输入当前账号密码');
                return;
            }
            window.toast('请稍候...');
            that.service.create(param, {
                'login-password': password
            }).then(rep => {
                if (rep.code === '100200') {
                    window.toast('添加成功', {
                        callback() {
                            window.location.reload();
                            // window.location.href = './index.html#/setting/symbol-config';
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
