/**
 * 组件入口文件
 */
import services from '../services';


// 账户管理
import admin from './admin/admin';
import adminUser from './admin/user/list'
import adminRole from './admin/role/list'
import adminUserLoginLog from './admin/user/loginLog/list'
import adminUserAdd from './admin/user/add/list'
import adminUserMember from './admin/user/member/list'

//角色
import rolePeople from './role/role-people/role-people'
import roleList from './role/role-list/role-list'
import roleAdd from './role/role-add/role-add'
import rolePerm from './role/row-perm/role-perm'


import commonusers from './commonusers/commonusers/commonusers';
import personalinfo from './commonusers/personalinfo/personalinfo';
import basicinfo from './commonusers/personalinfo/basicinfo/basicinfo';
import bankcard from './commonusers/personalinfo/bankcard/bankcard';


import errorHandle from './asset/errorHandle/errorHandle';
import errorHandleCurrent from './asset/errorHandle/current/list';
import errorHandleHistory from './asset/errorHandle/history/list';

//控制面板 设置密码
import setPassword from './account/setPwd/list'

//控制面板 谷歌验证
import googleAuth from './account/googleAuth/list'

//控制面板 登录信息
import loginInfoList from './account/loginInfo/list'


//用户资产
import property from './coin/property/list';

export default angular.module('app.components', [

    services.name,


    // 账户权限管理
    admin.name,
    adminUser.name,
    adminRole.name,
    adminUserLoginLog.name,
    adminUserAdd.name,
    adminUserMember.name,

    // 角色
    roleList.name,
    rolePeople.name,
    roleAdd.name,
    rolePerm.name,

    commonusers.name,
    personalinfo.name,
    basicinfo.name,
    bankcard.name,

    errorHandle.name,
    errorHandleCurrent.name,
    errorHandleHistory.name,

    setPassword.name,
    googleAuth.name,
    loginInfoList.name,

    //用户资产
    property.name,

]);