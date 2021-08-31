/**
 * 组件入口文件
 */
import services from '../services';


// 账户管理
import adminUser from './admin/user/list'

//DPCP Box
import dpcpConfig from './dpcp/dpcp-config/dpcp-config'
import dpcpFiles from './dpcp/dpcp-files/dpcp-files'
import dpcpNotice from './dpcp/dpcp-notice/dpcp-notice'
import dpcpFeedback from './dpcp/dpcp-feedback/dpcp-feedback'


// DPCP Lend


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


    // DPCP Box
    dpcpConfig.name,
    dpcpFiles.name,
    dpcpFeedback.name,
    dpcpNotice.name,

    commonusers.name,
    personalinfo.name,
    basicinfo.name,
    bankcard.name,

    setPassword.name,
    googleAuth.name,
    loginInfoList.name,


]);