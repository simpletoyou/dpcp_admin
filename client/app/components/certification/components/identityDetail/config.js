/**
 * Created by zhaojing on 2017/2/20.
 */
export default {

    TYPE_RMB_BANK: 'bank',

    FAIL_REASON:[
        {
            ID:'1',
            CN:'证件正面照片不清晰，无法辨认信息',
            EN:'Unclear photo, unable to identify personal info'
        },
        {
            ID:'2',
            CN:'证件姓名、性别或号码与实名认证信息不一致',
            EN:'The name, gender or number are inconsistent with the document submitted'
        },
        {
            ID:'3',
            CN:'证件有效期与实名认证填写的有效期不一致',
            EN:'Expiry date of your document does not match your verification info'
        },
        {
            ID:'4',
            CN:'证件类型不符合要求',
            EN:'Incorrect document type'
        },
        {
            ID:'5',
            CN:'手持证件信息不清晰，证件信息被遮挡',
            EN:'Unclear photo of you holding your document. Incomplete /blocked document information'
        },
        {
            ID:'6',
            CN:'证件照片与本人不符',
            EN:'Photo does not match the applicant'
        },
        {
            ID:'7',
            CN:'证件不真实',
            EN:'Please NEVER present a fake document'
        },
        {
            ID:'8',
            CN:'证件类型与系统中选择的不一致',
            EN:'Document type does not match your previous option'
        },
        {
            ID:'9',
            CN:'证件已过期',
            EN:'Document has expired'
        },
        // {
        //     ID:'10',
        //     CN:'居住证明不符合要求',
        //     EN:'Incorrect proof of residence'
        // },
        {
            ID:'11',
            CN:'需上传有效合法的英文翻译件',
            EN:'Valid English translation must be submitted'
        },
        {
            ID:'12',
            CN:'请上传电子版原件',
            EN:'Please upload a clear electronic version of your original document'
        },
        {
            ID:'13',
            CN:'年龄太小',
            EN:'You are under age'
        },
        {
            ID:'14',
            CN:'年龄太大',
            EN:'You are over age'
        },

        //新增
        {
            ID:'15',
            CN:'未上传证件反面照片，无法辨认信息',
            EN:'Photo of the back of ID card or Passport is required'
        },

        {
            ID:'16',
            CN:'需要手持有效的中国证件原件和写明平台名称、当时时间的字条进行照片拍摄上传',
            EN:'Photo of the self portrait holding ID card and paper marked with "QuickDax" and submission date is required'
        },

        {
            ID:'17',
            CN:'身份证背面照片不清晰，无法辨认证件有效期',
            EN:'Photo of the back ID card is not clear enough to identify the expire date'
        },


        {
            ID:'18',
            CN:'手持证件照片脸颊被遮挡',
            EN:'Face is covered by the document'
        },

    ]

}
