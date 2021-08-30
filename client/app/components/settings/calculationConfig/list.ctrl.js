// import config from '../config';
import mathTool from '../../../common/mathTool';

import passwordDialog from '../passwordDialog.html';
import confirm from "../../confirm/confirm";
import './list.less';

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


    this.form = {
      INDIVIDUAL_TYPE: '', //个人比例
      BOSS_TYPE: '', //直推比例
      COMPANY_TYPE: '', //团队比例
      ParamType: 'proportion',
      UDC_CHANGE_POINTS: '', //UDC转换比例
      COMPANY_ACCOUNT: '', //公司账户UID
      ACTUAL_ALLOCATE_POINTS: '', //当日实际分配的总UDC
      TEAM_ONE: '', //一级代理
      TEAM_TWO: '', //二级代理
      TEAM_THREE: '', //三级代理
      USER_INIT_RECOMMEND_NUM:'',//普通用户初始化推荐人数
      LOCK_NUM_PERCENT:'',//冻结百分比
      TRADE_COUNT_DAYS:'',//交易统计天数
      UNLOCK_NUM_PERCENT:'',//解冻基础百分率
      IEP_ACCOUNT:'',//机器人
    };
    this.UNLOCK_NUM_PERCENT = [];

    this.init();
  }

  init() {
    this.getPointsAllocate()
  }

  getPointsAllocate() {
    this.service.getPointsAllocate().then(data => {
      if (data.code == window.CODE.SUCCESS) {
        for (let i of data.data) {
          if(i.type == 'UNLOCK_NUM_PERCENT'){
            this.UNLOCK_NUM_PERCENT = i.proportionValue.split('/');
          }else{
            this.form[i.type] = i.proportionValue;
          }
        }
      } else {
        window.toast(data.msg)
      }

    })
  }

  submit(name) {
    if (name != undefined && name != 'undefined') {
      if (name == 'VIP') {
        this.form.ParamType = 'proportionTeam'
        if ($.trim(this.form.TEAM_ONE) === '') {
          window.toast('请输入一级代理获得IEP配置');
          return;
        }
        if ($.trim(this.form.TEAM_TWO) === '') {
          window.toast('请输入二级代理获得IEP配置');
          return;
        }
        if ($.trim(this.form.TEAM_THREE) === '') {
          window.toast('请输入三级代理获得IEP配置');
          return;
        }
      } else {
        this.form.ParamType = name
        if (name == 'USER_INIT_RECOMMEND_NUM') {
          if ($.trim(this.form.USER_INIT_RECOMMEND_NUM) === '') {
            window.toast('请输入普通用户初始化推荐人数');
            return;
          }
        } else if (name == 'UDC_CHANGE_POINTS') {
          if ($.trim(this.form.UDC_CHANGE_POINTS) === '') {
            window.toast('请输入货币转换比例');
            return;
          }
        } else if (name == 'COMPANY_ACCOUNT') {
          if ($.trim(this.form.COMPANY_ACCOUNT) === '') {
            window.toast('请输入公司账户UID');
            return;
          }
        } else if (name == 'ACTUAL_ALLOCATE_POINTS') {
          if ($.trim(this.form.ACTUAL_ALLOCATE_POINTS) === '') {
            window.toast('请输入当日实际分配的总UDC');
            return;
          }
        }
        else if (name == 'LOCK_NUM_PERCENT') {
          if ($.trim(this.form.LOCK_NUM_PERCENT) === '') {
            window.toast('请输入冻结百分比');
            return;
          }
        }
        else if (name == 'TRADE_COUNT_DAYS') {
          if ($.trim(this.form.TRADE_COUNT_DAYS) === '') {
            window.toast('请输入交易统计天数');
            return;
          }
        }
        else if (name == 'UNLOCK_NUM_PERCENT') {
          if ($.trim(this.UNLOCK_NUM_PERCENT[0]) === '') {
            window.toast('请输入冻结条件分子');
            return;
          }

          if ($.trim(this.UNLOCK_NUM_PERCENT[1]) === '') {
            window.toast('请输入冻结条件分母');
            return;
          }

          if ($.trim(this.UNLOCK_NUM_PERCENT[1]) < $.trim(this.UNLOCK_NUM_PERCENT[0])) {
            window.toast('冻结条件分子不能大于冻结条件分母');
            return;
          }
        }

      }


    } else {
      this.form.ParamType = 'proportion'
      if ($.trim(this.form.INDIVIDUAL_TYPE) === '') {
        window.toast('请输入个人获得比例');
        return;
      }
      if ($.trim(this.form.BOSS_TYPE) === '') {
        window.toast('请输入团队获得比例');
        return;
      }
      if ($.trim(this.form.COMPANY_TYPE) === '') {
        window.toast('请输入直推获得比例');
        return;
      }
    }


    if (name == 'UNLOCK_NUM_PERCENT') {
      this.form.UNLOCK_NUM_PERCENT = this.UNLOCK_NUM_PERCENT[0] + '/' + this.UNLOCK_NUM_PERCENT[1]
    }
    this.service.upDatePointsAllocate(this.form).then(data => {
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
