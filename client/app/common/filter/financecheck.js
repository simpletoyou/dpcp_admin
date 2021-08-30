/**
 * @file
 * @auth zhaojing
 * @date 202017/1/16
 */

export default {
    //格式化账户类型：个人、商户
    assetAccountType(val){
        let name = '';
        if(val=='INDIVIDUAL'){
            name = '个人'
        }else{
            name = '商户'
        }
        return name;
    },

    //格式化资产类型：人民币、果仁
    assetAssetType(val){
        let name = '';
        switch (val) {
            case 'CNY':
                name = '人民币';
                break;
            case 'GOP':
                name = '果仁';
                break;
            default:
                name = val;
        }
        return name;
    },

    //格式化操作类型：充值、转出
    assetOptType(val){
        let name = '';
        switch (val) {
            case 'IN':
                name = '充值';
                break;
            case 'OUT':
                name = '转出';
                break;
            default:
                name = val;
        }
        return name;
    },

    //格式化差错类型：多账、短账、状态不一致  依据moreAmount和lessAmount判断
    assetMismtachType(moreAmount,lessAmount){
        let mismtach={};
        if(moreAmount>0&&lessAmount==0){
            mismtach.name='多账';
            mismtach.val='+'+moreAmount;
        }else if(moreAmount==0&&lessAmount>0){
            mismtach.name='短账';
            mismtach.val='-'+lessAmount;
        }else if(moreAmount==0&&lessAmount==0){
            mismtach.name='状态不一致';
            mismtach.val=0;
        }
    },

    //格式化不同差错类型可执行的操作：重新匹配、差错处理、人工打款、坏账处理
    assetMismtachOpt(moreAmount,lessAmount){
        let opt='';
        if(moreAmount>0&&lessAmount==0){
            mismtach.name='多账';//1,3
            opt = '<span class="normal rematch">重新匹配</span><span class="normal"></span><span class="normal manual">人工打款</span><span class="normal"></span>';
        }else if(moreAmount==0&&lessAmount>0){
            mismtach.name='短账';//2,4
            opt = '<span class="normal"></span><span class="normal mismath">差错处理</span><span class="normal"></span><span  class="normal bad">坏账处理</span>';
        }else if(moreAmount==0&&lessAmount==0){
            mismtach.name='状态不一致';//2,3,4
            opt = '<span class="normal"></span><span  class="normal mismath">差错处理</span><span class="normal manual">人工打款</span><span class="normal bad">坏账处理</span>';
        }
        return opt;
    }
}