/*
 * @Description: 
 * @version: 
 * @Author: chenchuhua
 * @Date: 2021-08-30 10:36:36
 * @LastEditors: chenchuhua
 * @LastEditTime: 2021-08-31 18:07:41
 */
/**
 * @desc
 * auther:yxc
 * date:2018年4月13日
 */
import googleAuthDialog from '../../../components/admin/passwordDialog.html';
var feedbackBg = require('./img/logo.jpg');

class RoleAddController {
    /**
     * @param  {Object} controller的私有作用域
     * @param  {Object} 表格参数对象
     * @param  {Object}    此controller的私有接口
     * @param  {Object}    枚举类型接口
     * @param  {Object}    公共接口
     * @return {Object}
     */
    constructor($scope, roleService, enumSvc, commonSvc, $location,$uibModal) {
        'ngInject';

        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.roleService = roleService;
        this.$location = $location;

        this.roleName = '',
        this.feedbackBg = feedbackBg,
        this.feedbackList = [
            {
                id: 0,
                title: '没钱了',
                address: '0x4354546hfghfghfgh4543543',
                img: './imgs/logo.jpg'
            },
            {
                id: 1,
                title: '没钱了啊啊啊',
                address: '0x4354546hfghfghfgh4543543',
                img: './imgs/logo.jpg'
            },
            {
                id: 2,
                title: '没钱了呜呜呜',
                address: '0x4354546hfghfghfgh4543543',
                img: './imgs/logo.jpg'
            },
            {
                id: 3,
                title: '那就没钱了',
                address: '0x4354546hfghfghfgh4543543',
                img: './imgs/logo.jpg'
            },
            {
                id: 4,
                title: '好的',
                address: '0x4354546hfghfghfgh4543543',
                img: './imgs/logo.jpg'
            },
        ] 
    }

    //添加角色
    addRole(){
        console.log('添加角色')
    }

}

export default RoleAddController;