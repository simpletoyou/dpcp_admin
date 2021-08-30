import moment from 'moment';
import header from './header';
import footer from './footer';
import breadNav from './breadNav/breadNav';
import inputUpload from './input/upload/index';
import errorMsg from './input/error/index';
import calendar from './calendar/calendar';
import calendarSingle from './calendar/calendarSingle/calendar';
import calendarLink from './calendar/calendarLink/calendarLink';
import select from './input/select/select';
import radio from './input/radio/radio';
import checkbox from './input/checkbox/checkbox';

import tree from './tree/tree';
import cookie from './cookie';
import popWindow from './window/pop/popwindow';
import popSpecial from './window/popSpecial/popSpecial';
import loginWindow from './window/login/loginwindow';
import codeMap from './codeMap';
// import coinConfig from './coinConfig';


window.$coinList = [];
window.$symbolList = [];

let commonModule = angular.module('app.common', [
    header.name,
    footer.name,
    breadNav.name,
    inputUpload.name,
    errorMsg.name,
    calendar.name,
    calendarSingle.name,
    calendarLink.name,
    select.name,
    tree.name,
    radio.name,
    checkbox.name,
    popWindow.name,
    popSpecial.name,
    loginWindow.name
])
    .run(function (formlyConfig, $rootScope) {
        $rootScope.ZONE = 8;
        $rootScope.moment = moment;

        // 使用同步ajax请求进行处理
        // $.ajax({
        //     url: '/exchange_manager/managerAssetAndSymbol/configasset-list',
        //     method: 'GET',
        //     dataType: 'JSON',
        //     async: false,
        //     success(rep) {
        //         debugger;
        //     }
        // });

        $.when(ajaxCoinList(), ajaxSymbolList()).done((coinListRep, symbolListRep) => {
            doCoinListRep(coinListRep[0]);
            doSymbolListRep(symbolListRep[0]);

            function doCoinListRep(rep) {
                if (rep.code === window.CODE.SUCCESS) {
                    let list = rep.data;
                    let coinConfig = [];
                    $.map(list, (item, index) => {
                        coinConfig.push({
                            label: item.assetCode,
                            value: item.assetCode
                        });
                    });
                    $rootScope.$coinList = coinConfig;
                    window.$coinList = coinConfig;
                } else {
                    window.toast(rep.msg);
                }
            }

            function doSymbolListRep(rep) {
                if (rep.code === window.CODE.SUCCESS) {
                    let list = rep.data;
                    let symbolConfig = [];
                    $.map(list, (item, index) => {
                        symbolConfig.push({
                            label: item.title,
                            value: item.symbol
                        });
                    });
                    $rootScope.$symbolList = symbolConfig;
                    window.$symbolList = symbolConfig;
                } else {
                    window.toast(rep.msg);
                }
            }

            // if (symbolListRep.code === window.CODE.SUCCESS) {
            //     let list = symbolListRep.data;
            //     let symbolConfig = [];
            //     let tmpObj;
            //     $.map(list, (item, index) => {
            //         coinConfig.push({
            //             label: item.assetCode,
            //             value: item.assetCode
            //         });
            //     });
            //     $rootScope.symbolConfig = coinConfig;
            // } else {
            //     window.toast(coinListRep.msg);
            // }
        });

        formlyConfig.setType({
            name: 'calendar',
            template: '<gy-calendar gyformattime="model[options.key]"></gy-calendar>'
        });

        ajaxRoleList()

        /**
         * 获取权限列表
         * @returns {*}
         */
        function ajaxRoleList() {
            return $.ajax({
                url: '/exchange_manager//roleManager/menu-admin-list',
                method: 'GET',
                headers: getAuthHeader(),
                data: {
                    brokerId: 10003
                },
                dataType: 'JSON',
                async: false,
                success(rep) {
                    window.$role = rep.data || []
                }
            });
        }
        /**
         * 获取币种列表
         * @returns {*}
         */
        function ajaxCoinList() {
            return $.ajax({
                url: '/exchange_manager/managerAssetAndSymbol/configasset-list',
                method: 'GET',
                headers: getAuthHeader(),
                data: {
                    brokerId: 10003
                },
                dataType: 'JSON',
                async: false,
                success(rep) {

                }
            });
        }

        /**
         * 获取交易对列表
         * @returns {*}
         */
        function ajaxSymbolList() {
            return $.ajax({
                url: '/exchange_manager/managerAssetAndSymbol/configsymbol-list',
                method: 'GET',
                headers: getAuthHeader(),
                data: {
                    brokerId: 10003
                },
                dataType: 'JSON',
                async: false,
                success(rep) {

                }
            });
        }

        function getAuthHeader() {
            let headers = {
                'Content-Type': "application/json; charset=utf-8",
                'accept-language': 'zh-CN'
            };

            let token = cookie.get('LOGIN_TOKEN_ADMIN');

            let auth = {};
            if (token) {
                auth.token = token;
            }

            if ($.isEmptyObject(auth) === false) {
                headers.authorization = stringifyHeader(auth);
            }

            return headers;

            function stringifyHeader(param) {
                let results = [];
                if ($.isEmptyObject(param) === true) {
                    return '';
                }
                $.map(param, (value, key) => {
                    results.push(`${key}=${value}`);
                });
                return results.join(',');
            }
        }

    });
export default commonModule;
