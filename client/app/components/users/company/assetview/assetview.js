/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './assetview.comp';

let assetViewModule = angular.module('assetView', [uiRouter]).config(() => {})
.component('assetView', Component);

export default assetViewModule;