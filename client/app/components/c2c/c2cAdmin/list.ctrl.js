import passwordDialog from '../passwordDialog.html';
import './list.less';

class ListController {
  /**
   *
   * @param $scope
   */
  constructor($scope, c2cAdminSvc, $uibModal, $location, $cookies) {
    "ngInject";

    this.$scope = $scope;
    this.service = c2cAdminSvc;
    this.$uibModal = $uibModal;
    this.$location = $location;
    this.$cookies = $cookies;

    this.VipOne = {};
    this.VipTwo = {};
    this.VipThree = {};
    this.status1='';
    this.assetCode1 = 'BTC'
    this.type1 = 'SELL';
    this.status2='';
    this.type3 = 'SELL';
    this.status3='';
    this.fee = 'BTC'
    this.type2 = 'SELL';
    this.country1=""; 
    this.country2=""; 
    this.address = '';
    this.id1 = '';
    this.id2 = '';
    this.id4 = '';
    this.rate = 0;
    this.types = [{label:'出售',value:'SELL'},{label:'收购',value:'BUY'}];
    this.list = [];
    this.country = [
      {label:'美国',value:'USD'},
      {label:'中国',value:'CNY'},
      {label:'香港',value:'HKD'},
      {label:'英国',value:'GBP'},
      {label:'日本',value:'JPY'},
      {label:'韩国',value:'KRW'},

    ]
    this.init();
  }

  init() {
    this.query1();
    this.query2();
    this.query3();
    this.query4();
    this.getConfig();
  }
  updatas() {
    // console.log(this.type1,this.assetCode1)
  }
  changeCountry1() {
    this.query2()
  }
  changeCountry2() {
    this.query3()
  }
  changeCoin1() {
    this.query1()
  }
  changeType1() {
    this.query1()
  }
  changeType2() {
    this.query2()
  }
  changeType3() {
    this.query3()
  }
  query1() {
    this.service.getAssetCodeConfig().then(data => {
      this.status1 = ''
      this.id1 = ''
      if (data.code == window.CODE.SUCCESS) {
        data.data.map(item => {
          if(item.assetCode==this.assetCode1&&item.type==this.type1) {
            this.status1 = item.status
            this.id1 = item.id
          }
        })
      } else {
        window.toast(data.msg)
      }
    })
  }
  query2() {
    this.service.getC2cCountryConfigList().then(data => {
      this.status2 = ''
      this.id2 = ''
      this.rate = 0;
      if (data.code == window.CODE.SUCCESS) {
        data.data.map(item => {
          if(item.moneyName==this.country1.value&&item.type==this.type2) {
            this.status2 = item.status
            this.id2 = item.id
            this.rate = item.exRate
          }
        })
      } else {
        window.toast(data.msg)
      }
    })
  }
  query3() {
    this.service.getCurrencyConfig().then(data => {
      this.status3 = ''
      this.id3 = ''
      if (data.code == window.CODE.SUCCESS) {
        data.data.map(item => {
          if(item.assetCode==this.country2.value&&item.type==this.type3) {
            this.status3 = item.status
            this.id3 = item.id
          }
        })
      } else {
        window.toast(data.msg)
      }
    })
  }
  query4() {
    this.service.getMarginAddress().then(data => {
      if (data.code == window.CODE.SUCCESS) {
        this.id4 = data.data.id;
        this.address = data.data.profileValue;
      } else {
        window.toast(data.msg)
      }
    })
  }
  add1() {
    let that = this;
    let param = {
      "assetCode":this.assetCode1,
      "type":this.type1
    }
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
      that.service.insertAssetCode(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query1();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  del1() {
    let that = this;
    let param = {
      "id":this.id1
    }
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
      that.service.deleteAssetCodeConfig(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query1();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  add2() {
    let that = this;
    let param = {
      "country":this.country1.label,
      "type":this.type2,
      "moneyName":this.country1.value,
      "exRate":this.rate
      }
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
      that.service.addCountryConfig(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query1();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  del2() {
    let that = this;
    let param = {
      "id":this.id2
    }
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
      that.service.deleteC2cCountryConfig(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query2();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  open1(num) {
    let that = this;
    let status;
    if(num===0) {
      status = 'DELISTED'
    } else {
      status = 'LISTED'
    }
    let param = {
      "id":this.id1,
      "assetCode":this.assetCode1,
      "status":status,
      "type":this.type1
      }
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
      that.service.updateAssetCodeConfig(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query1();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  add3() {
    let that = this;
    let param = {
      "assetCode":this.country2.value,
      "type":this.type3,
      }
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
      that.service.addCurrencyConfig(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query3();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  del3() {
    let that = this;
    let param = {
      "id":this.id3
    }
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
      that.service.deleteCurrencyConfi(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query3();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  add4() {
    let that = this;
    let param = {
      "profileValue":this.address,
      }
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
      that.service.addMarginAddress(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query4();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  del4() {
    let that = this;
    let param = {
      "id":this.id4
    }
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
      that.service.delMarginAddress(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.address = '';
          that.id4 = '';
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  open4() {
    let that = this;
    let param = {
      "id":this.id4,
      "profileValue":this.address,
      "type":"ERC20"
    }
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
      that.service.updateMarginAddress(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query4();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  open3(num) {
    let that = this;
    let status;
    if(num===0) {
      status = 'DELISTED'
    } else {
      status = 'LISTED'
    }
    let param = {
      "id":this.id3,
      "assetCode":this.country2.value,
      "status":status,
      "type":this.type3
      }
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
      that.service.updateCurrencyConfig(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query3();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  open2(num) {
    let that = this;
    let status;
    if(num===0) {
      status = 'DELISTED'
    } else {
      status = 'LISTED'
    }
    let param = {
      "id":this.id2,
      "status":status,
      "country":this.country1.label,
      "type":this.type2,
      "moneyName":this.country1.value,
      "exRate":this.rate,
      }
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
      that.service.updateC2cCountryConfig(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.query2();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }
  //查询配置
  getConfig() {
    this.list = [];
    this.service.userMemberConfigInfo().then(data => {
      if (data.code == window.CODE.SUCCESS) {
        for (let i of data.data) {
          if (i.configType == 'VIP1') {
            this.VipOne = i;
          } else if (i.configType == 'VIP2') {
            this.VipTwo = i;
          } else if (i.configType == 'VIP3') {
            this.VipThree = i;
          } else if (i.configType == 'ASSET_CODE_FEE') {
            this.list.push(i);
          }
        }
      } else {
        window.toast(data.msg)
      }
    })
  }

  //更新某项配置
  updata(type, name, val, code, index, order) {

    if (typeof name == 'object') {
      for (let i of name) {
        if (!this[type][i]) {
          window.toast('请输入更改的值');
          return false;
        }
      }
    } else {
      if (code) {
        if (!this.list[index][name]) {
          window.toast('请输入更改的值');
          return false;
        }
      } else {
        if (!this[type][name]) {
          window.toast('请输入更改的值');
          return false;
        }
      }

    }

    let param = {
      id: code ? this.list[index].id : this[type].id,
      type: code ? code : val
    }

    if (val == 'ensureAsset') {
      param.ensureAsset = this[type][name];
    } else if (val == 'adNum') {
      param.buyAdNum = this[type].buyAdNum;
      param.sellAdNum = this[type].sellAdNum;
    } else if (val == 'adAssetNum') {
      param.buyCoinNum = this[type].buyCoinNum;
      param.sellCoinNum = this[type].sellCoinNum;
    }

    if (code) {
      param.assetCode = this.list[index].assetCode;
      param.assetCodeFee = this.list[index][name];
      param.feeType = order;
    }


    let that = this;

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
      that.service.updataUserMemberConfigInfo(param, header).then(data => {
        if (data.code == window.CODE.SUCCESS) {
          that.getConfig();
        } else {
          window.toast(data.msg)
        }
      })
      modalInstance.dismiss('ok');
    };

    this.$scope.$$cancel = function () {
      modalInstance.dismiss('cancel');
    };

  }

}


export default ListController;