/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:37
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 14:19:15
 */
// 公共接口
import api from './api';
import commonSvc from "./commonSvc";
import enumSvc from "./enumSvc";
// 各模块私有接口

import confirmGopSvc from './confirmGopSvc';

import commonusersSvc from './commonusersSvc';
import roleService from './roleService';



import adminSvc from './adminSvc';
import loginSvc from './loginSvc';



export default angular

    .module('app.services', [api.name])
    .service({
        commonSvc,
        enumSvc,
        confirmGopSvc,
        commonusersSvc,
        roleService,
        adminSvc,
        loginSvc
    });