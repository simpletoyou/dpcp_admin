/**
 * Created by zhaojing on 2017/2/22.
 */
/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

export default {


    auditMessage(str) {
        let statusName = '-'
        if (str === '' || typeof str == 'undefined') {
            return statusName;
        } else {
            switch (str) {
                case '1':
                    statusName = '身份证正面照片不清晰，无法辨认信息';
                    break;
                case '2':
                    statusName = '证件姓名、性别或号码与实名认证信息不一致';
                    break;
                case '3':
                    statusName = '证件有效期与实名认证填写的有效期不一致'
                    break;
                case '4':
                    statusName = '证件类型不符合要求';
                    break;
                case '5':
                    statusName = '手持证件信息不清晰，证件信息被遮挡';
                    break;
                case '6':
                    statusName = '证件照片与本人不符';
                    break;
                case '7':
                    statusName = '证件不真实';
                    break;
                case '8':
                    statusName = '证件类型与系统中选择的不一致';
                    break;
                case '9':
                    statusName = '证件已过期';
                    break;
                case '10':
                    statusName = '居住证明不符合要求';
                    break;
                case '11':
                    statusName = '需上传有效合法的英文翻译件';
                    break;
                case '12':
                    statusName = '请上传电子版原件';
                    break;
                case '13':
                    statusName = '年龄太小';
                    break;
                case '14':
                    statusName = '年龄太大';
                    break;
                case '15':
                    statusName = '未上传证件反面照片，无法辨认信息';
                    break;
                case '16':
                    statusName = '需要手持有效的中国证件原件和写明平台名称、当时时间的字条进行照片拍摄上传';
                    break;
                case '17':
                    statusName = '身份证背面照片不清晰，无法辨认证件有效期';
                    break;
                case '18':
                    statusName = '手持证件照片脸颊被遮挡';
                    break;
                default:
                    statusName = str;
            }
            return statusName;
        }
    }


}