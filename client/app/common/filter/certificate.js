/**
 * Created by zhaojing on 2017/2/16.
 */
export default {


    auditFirst(str) {
        let statusName = '-';
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case 'YES':
                    statusName = '是';
                    break;
                case 'NO':
                    statusName = '否';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    },

    auditStatus(str) {
        let statusName = '-';
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case 'INIT':
                    statusName = '待审核';
                    break;
                case 'OK':
                    statusName = '已通过';
                    break;
                case 'FAIL':
                    statusName = '未通过';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    }


}