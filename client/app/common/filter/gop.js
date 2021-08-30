/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

export default {


    gopInStatus(str) {
        let statusName = '-';
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case 'WAIT':
                    statusName = '进行中';
                    break;
                case 'SUCCESS':
                    statusName = '已完成';
                    break;
                case 'CANCEL':
                    statusName = '已取消';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    },

    gopOutStatus(str) {
        let statusName = '-';
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case 'UNKNOWN':
                    statusName = '待确认';
                    break;
                case 'WAIT':
                    statusName = '待审核';
                    break;
                case 'PROCESSING':
                    statusName = '进行中';
                    break;
                case 'SUCCESS':
                    statusName = '已到账';
                    break;
                case 'FAILURE':
                    statusName = '失败';
                    break;
                case 'REFUSE':
                    statusName = '已拒绝';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    },

    restOrderStatus(str){
        let statusName = '-';
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case 'WAIT':
                    statusName = '进行中';
                    break;
                case 'PROCESSING':
                    statusName = '进行中';
                    break;
                case 'CANCEL':
                    statusName = '已关闭';
                    break;
                case 'SUCCESS':
                    statusName = '已完成';
                    break;
                case 'CLOSED':
                    statusName = '已关闭';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    },

    restOrderType(str){
        let statusName = '-';
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case 'SELL':
                    statusName = '卖';
                    break;
                case 'BUY':
                    statusName = '买';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    },

    restOrderFlag(str){
        let statusName = '-';
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case 'FIXED':
                    statusName = '限价';
                    break;
                case 'MARKET':
                    statusName = '市价';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    },

    unverifyNumFilter(str) {
        let result = '';
        if (str > 99) {
            result = '99+';
        } else if (str > 0) {
            result = str + '';
        }
        return result;
    },

    refuseReasonFilter(str) {
        let result = str;
        switch (str) {
            case '10001':
                result = '理由1'
                break;
            case '10002':
                result = '理由2'
                break;
            case '10003':
                result = '理由3'
                break;
        }
        return result;
    }


}
