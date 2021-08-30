/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

export default {
    cashInStatus(str) {
        let statusName = '-'
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
                case 'FAILURE':
                    statusName = '已取消';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    }
}