import passwordDialog from '../passwordDialog.html';
import RoleList from './roleList.html';
import './list.less';

class ListController {
  /**
   *
   * @param $scope
   */
  constructor($scope, agentAccountSvc, $uibModal, $location, $cookies) {
    "ngInject";

    this.$scope = $scope;
    this.service = agentAccountSvc;
    this.$uibModal = $uibModal;
    this.$location = $location;
    this.$cookies = $cookies;

    //币种列表
    this.$scope.coinList = $scope.$root.$coinList;
    this.coinType = $scope.$root.$coinList[0].value;
    this.list = [];
    this.pageSize = 10;
    this.pageNo = 1;
    this.account = '';
    this.uid = '';
    this.userName = '';
    this.totalNum = 0;
    this.isLoading = true;
    this.init();
    this.roleLists = [];
    this.i18ns = {
      'WEBSITE_MAINTAIN': '网站维护',
      'DATA_EXPORT': '导出数据',
      'NAMECTL': '显示姓名',
      'USER_INFO': '用户详细信息',
      'CANCEL_ORDER': '撤销用户挂单'
    }
  }

  init() {
    this.getList();
  }

  // 查询用户权限
  getUserRole(item) {
    this.items = item;
    this.service.getUserRole({
      id: item.id
    }).then(data => {
      if (data.code == '100200') {
        let array = [];
        Object.entries(data.data).forEach(([key, value]) => {
          // console.log('key', key, 'value', value))
          array.push({
            name: key,
            value: value
          })
        })
        this.roleLists = array;
        this.showRoleList(item)
      } else {
        window.toast(data.msg);
      }
    })
  }

  //打开权限列表
  showRoleList(item) {
    let that = this;
    let modalInstance = this.$uibModal.open({
      template: RoleList,
      scope: this.$scope,
      controller() {}
    });

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };

    this.$scope.$$ok = function () {
      let json = [];
      for (let i of that.roleLists) {
        json.push({
          id: that.items.id,
          type: i.name,
          status: i.value == true ? 'YES' : 'NO'
        })
      }
      that.service.setUserRole({
        tmsRightDtos: json
      }).then(data => {
        if (data.code == '100200') {
          window.toast('设置权限成功')
          that.getList();
          modalInstance.dismiss('cancel');
        } else {
          window.toast(data.msg);
        }
      })
    };
  }

  //打开密码框
  openPwd(fn) {
    let modalInstance = this.$uibModal.open({
      template: passwordDialog,
      scope: this.$scope,
      controller() {}
    });

    this.$scope.$$ok = function (password) {
      if (password === '') {
        window.toast('请输入当前账号密码');
        return;
      }
      let header = {
        'login-password': password
      };
      fn(header, function () {
        modalInstance.dismiss('ok');
      })
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }

  //设置账户启用还是撤销
  setAccountStatus(item) {
    let param = {
      type: item.status == 'VALID' ? 'INVALID' : 'VALID',
      id: item.id
    }
    this.openPwd((header, fn) => {
      this.service.setAccountStatus(param, header).then(data => {
        if (data.code == '100200') {
          fn();
          window.toast('设置账户状态成功')
          this.getList();
        } else {
          window.toast(data.msg);
        }
      })
    });

  }

  //重置密码
  setPwd(item) {
    let param = {
      id: item.id
    }
    this.openPwd((header, fn) => {
      this.service.setAccountPwd(param, header).then(data => {
        if (data.code == '100200') {
          fn();
          window.toast('重置登录密码成功')
          this.getList();
        } else {
          window.toast(data.msg);
        }
      })
    })

  }

  //查询账户列表
  getList() {
    this.isLoading = true;
    let param = {
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }
    this.service.getAccount(param).then(data => {
      this.isLoading = false;
      if (data.code == '100200') {
        this.list = data.data.list
        this.totalNum = data.data.pageNum * this.pageSize;
      } else {
        window.toast(data.msg);
      }
    })
  }

  //添加账户
  submit() {
    if (!this.account) {
      window.toast('请输入账户');
      return false;
    }
    if (this.account.length > 25) {
      window.toast('账户长度不允许大于25个字符');
      return false;
    }
    if (!this.uid) {
      window.toast('请输入NNEX平台UID');
      return false;
    }
    if (!this.userName) {
      window.toast('请输入用户名');
      return false;
    }

    let param = {
      userName: this.userName,
      passWord: '123456',
      assetCode: this.coinType,
      account: this.account,
      bindUid: this.uid
    }
    this.openPwd((header, fn) => {
      this.service.addAccount(param, header).then(data => {
        if (data.code == '100200') {
          this.coinType = this.$scope.coinList[0].value;
          this.account = '';
          this.userName = '';
          this.uid = '';
          fn();
          this.getList();
        } else {
          window.toast(data.msg);
        }
      })
    });

  }

  //切换分页
  pageChanged() {
    this.getList();
  }

}


export default ListController;