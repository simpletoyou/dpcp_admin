/**
 * 组件入口文件
 */
import services from '../services';

import orderAdd from './order/add/add';


import companyuser from './users/company/companyuser';
import companyUser from './users/company/companyuser';
import companyList from './users/companylist/companylist';
import companyadd from './users/companyadd/companyadd';
import assetView from './users/company/assetview/assetview';
import rmbManage from './users/company/rmbmanage/rmbmanage';

//角色
import rolePeople from './role/role-people/role-people'
import roleList from './role/role-list/role-list'
import roleAdd from './role/role-add/role-add'
import rolePerm from './role/row-perm/role-perm'


import commonusers from './commonusers/commonusers/commonusers';
import personalinfo from './commonusers/personalinfo/personalinfo';
import basicinfo from './commonusers/personalinfo/basicinfo/basicinfo';
import bankcard from './commonusers/personalinfo/bankcard/bankcard';
import locketList from './commonusers/locketlist/locketlist';
import TeamAdmin from './team/list';


import noticeList from './notice/list/list';
import iconList from './notice/iconlist/iconlist';
import iconAdd from './notice/iconadd/iconadd';
import noticeApplist from './notice/applist/applist';
import noticeAppcreate from './notice/appcreate/appcreate';
import noticeAdd from './notice/add/add';
import noticeCreate from './notice/create/create';
import noticeAlist from './notice/alist/alist';
import noticeMember from './notice/member/member';

import cashInList from './cash/cashIn/list';
import cashOutList from './cash/cashOut/list';

import coinInList from './coin/in/list';
import coinOutList from './coin/out/list';
import coinCheckList from './coin/check/list';
import coinRules from './coin/rules/list';
// import coinTrade from './coin/trade/list';
import coinDeposit from './coin/deposit/list';
import restOrder from './coin/restOrder/list';
import dealList from './coin/deal/list';
import admin from './admin/admin';
import adminUser from './admin/user/list'
import adminRole from './admin/role/list'
import adminUserLoginLog from './admin/user/loginLog/list'
import adminUserAdd from './admin/user/add/list'
import adminUserMember from './admin/user/member/list'

import allBalance from './asset/allBalance/allBalance';
import allBalanceCny from './asset/allBalance/cny/list';
import allBalanceGop from './asset/allBalance/gop/list';

import batch from './asset/batch/batch';
import batchCny from './asset/batch/cny/list';
import batchGop from './asset/batch/gop/list';

import errorHandle from './asset/errorHandle/errorHandle';
import errorHandleCurrent from './asset/errorHandle/current/list';
import errorHandleHistory from './asset/errorHandle/history/list';

//实名认证
import identityVerify from './certification/identity/identity'
import identityCurrent from './certification/identity/current/list';
import identityHistory from './certification/identity/history/list';
import addressVerify from './certification/address/address'
import addressCurrent from './certification/address/current/list';
import addressHistory from './certification/address/history/list';
import addressDetail from './certification/components/addressDetail/list';
import identityDetail from './certification/components/identityDetail/list';


import kycs from './certification/kycs/kycs';
import kycsVerify from './certification/kycs/verify/list';
import kycsAddress from './certification/kycs/address/list';
import kycsHistory from './certification/kycs/history/list';


// 参数&风控
import settingRisk from './settings/risk/list';

//c2c
import c2cGolden from './c2c/golden/list';
import c2cAdParam from './c2c/adParam/list'
import c2cComplaint from './c2c/complaint/list';
import c2cComplaintDetail from './c2c/complaint/detail/list';
//C2C新增配置
import c2cAdmins from './c2c/c2cAdmin/list';


// 挂单控制
import tradeControl from './control/list';

// 锁仓计划
import lockCoinList from './lock/list/list';
import lockCoinSetting from './lock/setting/list';
import lockCoinStat from './lock/stat/list';

// SMC基金
import smcFund from './smcfund/param/list';

// 好友邀请活动
import inviteSetting from './invite/setting/list';

// 添加新币
import coinAdd from './settings/coinAdd/list';
// 新币配置
import coinConfig from './settings/coinConfig/list';
// 添加交易对
import symbolAdd from './settings/symbolAdd/list';
// 交易对配置
import symbolConfig from './settings/symbolConfig/list';
// 免手续费白名单
import symbolWhiteList from './settings/symbolWhiteList/list';
// 奖励配置模块
import reward from './settings/reward/list';
// 算力配置模块
import calculationConfig from './settings/calculationConfig/list';
//冻结配置
import dongjiefrozen from './settings/dongjiefrozen/list';
//项目方账户
import agentAccount from './settings/agentAccount/list';



//忠诚计划
import loyaltyPrograms from './settings/loyaltyProgram/list';
//控制面板 设置密码
import setPassword from './account/setPwd/list'

//控制面板 谷歌验证
import googleAuth from './account/googleAuth/list'

//控制面板 登录信息
import loginInfoList from './account/loginInfo/list'

// 交易管理 交易记录
import tradeRecord from './trade/record/list'
// 国京管理 交易记录
import tradeGuoJing from './trade/guojing/list'
// 国京管理 绑定管理
import tradeGuoJingAdmin from './trade/guojingAdmin/list'
// 交易管理 C2C交易记录
import tradeC2c from './trade/C2C/list'
// 交易管理 用户算力获得奖励查询
import awardRecord from './trade/awardRecord/list'
// 团队绩效管理
import performance from './team/performance/list'
// 团队绩效管理详情
import teamDetails from './team/performance/teamDetails/list'

//冻结解冻记录
import freezeThawRecord from './coin/FreezeThawRecord/list';

//释放记录
import rewarDetail from './coinlocking/rewarDetail/list';


//创新统计
import innovation from './coin/innovation/list';
import airDrop from './coin/airDrop/list';

//用户资产
import property from './coin/property/list';

//c2c成为代理审核
import c2cAgent from './commonusers/c2cAgent/list';

import cooperation from './trade/cooperation/list';
import distribution from './trade/distribution/list'
import Investment from './trade/Investment/list'
import vdsfee from './trade/VDSFee/list'
import vdsnode from './trade/vdsnode/list'

export default angular.module('app.components', [
    vdsnode.name,
    vdsfee.name,
    Investment.name,
    distribution.name,
    cooperation.name,
    c2cAgent.name,
    services.name,
    agentAccount.name,

    orderAdd.name,

    companyuser.name,
    companyUser.name,
    companyList.name,
    companyadd.name,
    assetView.name,
    rmbManage.name,

    roleList.name,
    rolePeople.name,
    roleAdd.name,
    rolePerm.name,

    commonusers.name,
    personalinfo.name,
    basicinfo.name,
    bankcard.name,
    locketList.name,
    TeamAdmin.name,
    //团队绩效管理
    performance.name,
    //团队绩效管理详情
    teamDetails.name,

    // 公告模块
    noticeList.name,
    iconList.name,
    iconAdd.name,
    noticeApplist.name,
    noticeAppcreate.name,
    noticeAdd.name,
    noticeCreate.name,
    noticeAlist.name,
    noticeMember.name,


    //人民币提现
    cashOutList.name,
    //人民币充值
    cashInList.name,

    // 算力奖励
    reward.name,
    calculationConfig.name,
    dongjiefrozen.name,

    loyaltyPrograms.name,
    //虚拟币充值
    coinInList.name,
    //虚拟币转出
    coinOutList.name,
    //虚拟币审核
    coinCheckList.name,
    // 摆盘服务
    // coinTrade.name,
    // 充值服务
    coinDeposit.name,
    // 提现充值规则
    coinRules.name,
    //果仁挂单
    restOrder.name,

    //成交
    dealList.name,
    // 账户权限管理
    admin.name,
    adminUser.name,
    adminRole.name,
    adminUserLoginLog.name,
    adminUserAdd.name,
    adminUserMember.name,

    //资产管理
    allBalance.name,
    allBalanceCny.name,
    allBalanceGop.name,

    batch.name,
    batchCny.name,
    batchGop.name,

    errorHandle.name,
    errorHandleCurrent.name,
    errorHandleHistory.name,

    identityVerify.name,
    identityCurrent.name,
    identityHistory.name,
    identityDetail.name,

    kycs.name,
    kycsVerify.name,
    kycsAddress.name,
    kycsHistory.name,

    addressVerify.name,
    addressCurrent.name,
    addressHistory.name,
    addressDetail.name,

    settingRisk.name,

    c2cGolden.name,
    c2cComplaint.name,
    c2cComplaintDetail.name,
    c2cAdParam.name,
    c2cAdmins.name,

    tradeControl.name,
    lockCoinList.name,
    lockCoinSetting.name,
    lockCoinStat.name,

    smcFund.name,

    inviteSetting.name,


    coinAdd.name,
    coinConfig.name,
    symbolAdd.name,
    symbolConfig.name,
    symbolWhiteList.name,

    tradeRecord.name,
    tradeGuoJing.name,
    tradeGuoJingAdmin.name,
    tradeC2c.name,
    awardRecord.name,

    setPassword.name,
    googleAuth.name,
    loginInfoList.name,

    freezeThawRecord.name,
    rewarDetail.name,
    innovation.name,
    airDrop.name,

    //用户资产
    property.name,

]);