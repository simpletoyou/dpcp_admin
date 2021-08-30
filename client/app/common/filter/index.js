/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

import angular from 'angular';

import rmb from './rmb';
import cashFilters from './cash';
import gopFilters from './gop';
import finacecheck from './financecheck';
import util from './util'
import certificate from './certificate';
import auditMessage from './auditMessage';

export default angular.module('app.filters', [])
    .filter('cashInStatus', function () {
        return cashFilters.cashInStatus;
    })
    .filter('gopInStatus', function () {
        return gopFilters.gopInStatus;
    })
    .filter('gopOutStatus', function () {
        return gopFilters.gopOutStatus;
    })
    .filter('restOrderStatus',function () {
        return gopFilters.restOrderStatus;
    })
    .filter('unverifyNumFilter', function () {
        return gopFilters.unverifyNumFilter;
    })
    .filter('refuseReasonFilter', function() {
        return gopFilters.refuseReasonFilter;
    })
    .filter('restOrderType',function () {
        return gopFilters.restOrderType;
    })
    .filter('restOrderFlag',function () {
        return gopFilters.restOrderFlag;
    })
    .filter('assetAccountType',function () {
        return finacecheck.assetAccountType;
    })
    .filter('assetAssetType',function () {
        return finacecheck.assetAssetType;
    })
    .filter('assetOptType',function () {
        return finacecheck.assetOptType;
    })
    .filter('assetMismtachType',function () {
        return finacecheck.assetMismtachType;
    })
    .filter('assetMismtachOpt',function () {
        return finacecheck.assetMismtachOpt;
    })
    .filter('rmb', function () {
        return rmb;
    })
    .filter('floorFix', function () {
        return util.floorFix;
    })
    .filter('numPoint2', function () {
        return function (num) {
            if (num >= 0) {
                let num1 = '' + num;

                // 有小数点  且小数倍数为 1 位   (parseInt(num * 100) / 100)
                if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 1) { // 1 位小数
                    return num1 + '0';
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 2) { // 2 位小数
                    return num1;
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length > 2) { // 2 位以上小数
                    return (parseInt(parseFloat(num1) * 100) / 100).toFixed(2);
                } else if (num1.indexOf('.') === -1) { // 整数
                    return (num1 + '.00');
                }
            } else {
                return num;
            }

        }
    })
    .filter('numPoint4', function () {
        return function (num) {
            if (num >= 0) {
                let num1 = '' + num;

                // 有小数点  且小数倍数为 1 位   (parseInt(num * 100) / 100)
                if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 1) { // 1 位小数
                    return num1 + '0';
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 2) {
                    return num1;
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 3) {
                    return num1;
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 4) {
                    return num1;
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length > 4) {
                    return (parseInt(parseFloat(num1) * 100) / 100).toFixed(4);
                } else if (num1.indexOf('.') === -1) { // 整数
                    return (num1 + '.0000');
                }
            } else {
                return num;
            }

        }
    })
    .filter('numPoint8', function () {
        return function (num) {
            if (num >= 0) {
                let num1 = '' + num;

                // 有小数点  且小数倍数为 1 位   (parseInt(num * 100) / 100)
                if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 1) { // 1 位小数
                    return num1 + '0';
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 2) {
                    return num1;
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 3) {
                    return num1;
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 4) {
                    return num1;
                } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length > 4) {
                    return (parseInt(parseFloat(num1) * 100) / 100).toFixed(8);
                } else if (num1.indexOf('.') === -1) { // 整数
                    return (num1 + '.0000');
                }
            } else {
                return num;
            }

        }
    })
    .filter('numPlusAndMinus', function () {
        return function (num) {
            if (num > 0) {
                return '+' + num;
            } else if (num < 0) {
                return '-' + num;
            } else {
                return num;
            }
        }
    })
    .filter('auditFirst',function () {
        return certificate.auditFirst;
    })
    .filter('auditStatus',function () {
        return certificate.auditStatus;
    })
    .filter('auditMessage',function () {
        return auditMessage.auditMessage;
    })
