/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

export default class {
    /**
     *
     * @param $scope
     */
    constructor($scope, adminSvc,$cookies) {
        "ngInject";

        this.service = adminSvc;
        this.$scope = $scope;
        this.$cookies = $cookies;
        //当前账号的角色
        this.role = this.$cookies.get('role');
        this.unlockList = [];
        this.lockList = [];
        this.list = null;
        this.lockUid = "";
        this.unlockUid = "";
        //要创建的新账号的角色
        this.createRole = "";
        this.isLoading = false;
        this.status = 'UNLOCK';

        this.condition = {
            pageNo:1,
            pageSize:30
        };

        //以前开发的角色回显容错
        this.roleNameDic = {
            'ADMIN':'管理员',
            'CUSTOM_SERVICE':'客服',
            'ACCOUNTANT':'会计',
        }
        this.init();
    }

    //返回角色
    returnRole(role){
        //console.log(role)
        //console.log(role)
        return this.roleNameDic[role] || role
    }

    init() {
        if( this.role==='ADMIN'){
            this._fetchList();
        }
    }



    /**
     * 获取列表
     */
    _fetchList() {
        this.isLoading = true;

        let param = Object.assign({}, this.condition);

        this.service.adminList(param).then(rep => {
            this.isLoading = false;
            let list = rep.data.list
            let i = 0;
            this.unlockList = [];
            this.lockList = [];
            for(i=0;i<list.length;i++){
                if(list[i].locked==="UNLOCK"){
                    this.unlockList.push(list[i]);
                }else{
                    this.lockList.push(list[i]);
                }
            }
            this._formatList(list);
            this.totalNum = rep.data.totalNum;
        });
    }

    _formatList(list){
        if(this.status === 'LOCK'){
            this.list = this.lockList;
        }else if(this.status === 'UNLOCK'){
            this.list = this.unlockList;
        }else{
            this.list = list;
        }
    }

    setLoginPassword(){
        if(this.confirmPassword!==this.newPassword){
            window.toast("两次输入新密码不一致");
            return;
        }
        let that = this;
        let header = {
            'login-password': this.oldPassword
        };

        this.service.setLoginPassword({
            'login-password': this.newPassword
        }, header).then(rep => {
            if(rep.code===window.CODE.SUCCESS){
                window.toast('密码修改成功');
                that.oldPassword ='';
                that.newPassword ='';
                that.confirmPassword ='';
            }else{
                window.toast(rep.msg);
            }
        })
    }

    create(){
        let that = this;
        this.service.create({
            userName: this.userName,
            password: this.password,
            role: this.createRole,
            account: this.account
        }).then(rep => {
            if(rep.code===window.CODE.SUCCESS){
                window.toast("创建成功",{
                    callback(){
                        that._fetchList();
                    }
                });
                this.userName = '';
                this.password = '';
                this.createRole = '';
                this.phone = '';
            }else{
                window.toast(rep.msg);
            }
        })
    }

    lock(uid){
        let that = this;
        this.service.lockAdmin({
            uid: uid
        }).then(rep => {
            if(rep.code===window.CODE.SUCCESS){
                window.toast("账户锁定成功",{
                    callback(){
                        that.lockUid = '';
                        that._fetchList();
                    }
                });
            }else{
                window.toast(rep.msg);
            }
        })
    }

    unlock(uid){
        let that = this;
        this.service.unlockAdmin({
            uid: uid
        }).then(rep => {
            if(rep.code===window.CODE.SUCCESS){
                window.toast("账户解锁成功",{
                    callback(){
                        that.unlockUid = '';
                        that._fetchList();
                    }
                });
            }else{
                window.toast(rep.msg);
            }
        })
    }
}
