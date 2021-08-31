/**
 * 组件入口文件
 */
import services from '../services';


// 账户管理
import adminUser from './admin/user/list'

//角色
import rolePeople from './role/role-people/role-people'
import roleList from './role/role-list/role-list'
import roleAdd from './role/role-add/role-add'
import rolePerm from './role/row-perm/role-perm'


import commonusers from './commonusers/commonusers/commonusers';
import personalinfo from './commonusers/personalinfo/personalinfo';
import basicinfo from './commonusers/personalinfo/basicinfo/basicinfo';
import bankcard from './commonusers/personalinfo/bankcard/bankcard';



//控制面板 设置密码
import setPassword from './account/setPwd/list'

//控制面板 谷歌验证
import googleAuth from './account/googleAuth/list'

//控制面板 登录信息
import loginInfoList from './account/loginInfo/list'



export default angular.module('app.components', [

    services.name,


    // 账户权限管理
    adminUser.name,


    // 角色
    roleList.name,
    rolePeople.name,
    roleAdd.name,
    rolePerm.name,

    commonusers.name,
    personalinfo.name,
    basicinfo.name,
    bankcard.name,

    setPassword.name,
    googleAuth.name,
    loginInfoList.name,


]);