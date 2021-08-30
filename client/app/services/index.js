// 公共接口
import api from './api';
import commonSvc from "./commonSvc";
import enumSvc from "./enumSvc";
// 各模块私有接口

import orderAddSvc from './orderAddSvc';
import refundListSvc from './refundListSvc';
import assetViewSvc from './assetViewSvc';
import companyListSvc from './companyListSvc';
import companySvc from './companySvc';
import rmbManageSvc from './rmbManageSvc';

import usersCompanyTradedetailSvc from './usersCompanyTradedetailSvc';

import usersCompanyAccountSvc from './usersCompanyAccountSvc';

import usersCompanyNutentrySvc from './usersCompanyNutentrySvc';

import confirmGopSvc from './confirmGopSvc';
import batchPaySvc from './batchPaySvc';

import commonusersSvc from './commonusersSvc';
import roleService from './roleService';
import basicInfoSVC from './basicInfoService';
import bankcardSVC from './bankCardService';

import accountcollectSvc from './accountcollectSvc';
import bankorderSvc from './bankOrderService';

import noticeSvc from './noticeSvc';

import cashSvc from './cashSvc';
import coinSvc from './coinSvc';
import adminSvc from './adminSvc';
import loginSvc from './loginSvc';

import financeCheckSvc from './financeCheckSvc';
import securitySvc from './securitySvc';
import settingsSvc from './settingsSvc';
import c2cSvc from './c2cSvc';
import c2cAdminSvc from './c2cAdminSvc';

//项目方账户
import agentAccountSvc from './agentAccountSvc';

import tradeControlSvc from './tradeControlSvc';

// 锁仓
import lockCoinSvc from './lockCoinSvc';

// SMC基金
import smcFundSvc from './smcFundSvc';

// 好友邀请活动
import inviteSvc from './inviteSvc';

// 账户相关
import accountSvc from './accountSvc'
// 团队相关
import teamSvc from './teamSvc'

//冻结解冻记录
import freezeThawRecordSvc from './freezeThawRecord';

//释放记录
import rewarDetailSvc from './rewarDetailSvc';
//创新统计
import innovationSvc from './innovationSvc';
import hatchSvc from './hatchSvc';
//用户资产
import propertySvc from './propertySvc';

//用户冻结比例
import dongjiefrozenSvc from './dongjiefrozenSvc';

//用户冻结比例
import loyaltySvc from './loyaltySvc';
//c2c会员管理
import c2cAgentSvc from './c2cAgnetSvc';

//共赢活动
import cooperationSvc from './cooperationSvc'

export default angular

    .module('app.services', [api.name])
    .service({
        cooperationSvc,
        agentAccountSvc,
        c2cAgentSvc,
        commonSvc,
        enumSvc,
        orderAddSvc,
        refundListSvc,
        assetViewSvc,
        companyListSvc,
        companySvc,
        rmbManageSvc,
        usersCompanyTradedetailSvc,
        usersCompanyAccountSvc,
        usersCompanyNutentrySvc,
        confirmGopSvc,
        commonusersSvc,
        roleService,
        basicInfoSVC,
        bankcardSVC,
        batchPaySvc,
        accountcollectSvc,
        bankorderSvc,
        noticeSvc,
        cashSvc,
        coinSvc,
        adminSvc,
        loginSvc,
        financeCheckSvc,
        securitySvc,
        settingsSvc,
        c2cSvc,
        tradeControlSvc,
        lockCoinSvc,
        smcFundSvc,
        inviteSvc,
        accountSvc,
        teamSvc,
        c2cAdminSvc,

        freezeThawRecordSvc,
        rewarDetailSvc,
        innovationSvc,
        hatchSvc,
        propertySvc,
        dongjiefrozenSvc,
        loyaltySvc,
    });