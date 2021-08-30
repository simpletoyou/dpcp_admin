// import config from '../config';
import mathTool from '../../../common/mathTool';

// import passwordDialog from '../passwordDialog.html';
// import confirm from "../../confirm/confirm";
import './member.less';

class ListController {
  /**
   *
   * @param $scope
   */
  constructor($scope, settingsSvc, $uibModal, $location, $cookies) {
    "ngInject";

    this.$scope = $scope;
    this.service = settingsSvc;
    this.$uibModal = $uibModal;
    this.$location = $location;
    this.$cookies = $cookies;
    this.symbolList = $scope.$root.$symbolList;
    console.log(this.symbolList)
    this.isShow = false;
    this.form = {
      member_price:'',
      superior:'',
      member: '',
      msg1:'',
      msg2:'',
      msg3:'',
      id1:'',
      id2:'',
      id3:'',
      id4:'',
      coin:'',
    };
    this.param = {
      id:'',
      type:'',
      setProporation:''
    };
    this.UNLOCK_NUM_PERCENT = [];

    this.init();
  }

  init() {
    this.getMember()
  }

  getMember() {
    this.service.getMember().then(data => {
      if (data.code == window.CODE.SUCCESS) {
        for (let i of data.data) {
          if(i.type == 'MEMBER_APPLY_ASSET'){
            this.form.member_price = i.proportionValue;
            this.form.msg1 = i.remarks;
            this.form.id1 = i.id;
          }
          if(i.type == 'MEMBER_TRADE_FEE' && i.label == 'MEMBER'){
            this.form.superior = i.proportionValue;
            this.form.msg2 = i.remarks;
            this.form.id2 = i.id;
          }
          if(i.type == 'MEMBER_TRADE_FEE' && i.label == 'PARTNER'){
            this.form.member = i.proportionValue;
            this.form.msg3 = i.remarks;
            this.form.id3 = i.id;
          }
          if(i.id == '19' && i.type == 'MEMBER_TRADE_FEE'){
            if(i.proportionValue){
              this.form.coin = i.proportionValue+',';
            } 
            this.form.id4 = i.id;
          }
        }
      } else {
        window.toast(data.msg)
      }

    })
  }
  showCoin() {
    this.isShow = !this.isShow;
  }
  getCoin(value) {
    if(this.form.coin.indexOf(value)>=0){
      this.form.coin=this.form.coin.split(value+',').join('')
    } else {
      this.form.coin = this.form.coin+value+',';
    }
   
  }
  submit(name) {
    
    if (name == 'MEMBER_APPLY_ASSET') {
      if(!this.form.member_price){
        window.toast('值不能为空')
      }else {
        this.param.id = this.form.id1;
        this.param.type = 'MEMBER_APPLY_ASSET';
        this.param.setProporation = this.form.member_price;
      }
    }
    if (name == 'MEMBER_TRADE_FEE1') {
      if(!this.form.superior){
        window.toast('值不能为空')
      }else {
        this.param.id = this.form.id2;
        this.param.type = 'MEMBER_TRADE_FEE';
        this.param.setProporation = this.form.superior;
      }
    }
    if (name == 'MEMBER_TRADE_FEE2') {
      if(!this.form.member){
        window.toast('值不能为空')
      }else {
        this.param.id = this.form.id3;
        this.param.type = 'MEMBER_TRADE_FEE';
        this.param.setProporation = this.form.member;
      }
    }
    if (name == 'coin') {
      this.isShow =false;
      if(!this.form.coin){
        window.toast('值不能为空')
      }else {
        this.param.id = this.form.id4;
        this.param.type = 'MEMBER_TRADE_FEE';
        this.param.setProporation = this.form.coin.substring(0,this.form.coin.length-1);
      }
    }
    this.service.setMember(this.param).then(data => {
      if (data.code == window.CODE.SUCCESS) {
        window.toast('修改成功');
      } else {
        window.toast(data.msg);
      }
    })

  }

  UpDate(name) {
    this.service[name]().then(data => {
      if (data.code == window.CODE.SUCCESS) {
        window.toast('操作成功');
      } else {
        window.toast(data.msg);
      }
    })
  }

}


export default ListController;
