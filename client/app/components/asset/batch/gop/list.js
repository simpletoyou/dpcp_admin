/**
 * @desc 组件入口
 * 对账批次表——GOP
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './list.comp';

let batchGopModule = angular.module('batchGop', [
  uiRouter
])
.config(() => {})
/*.filter('bankOrderListStatusTexts',function(){
    return function(status){
        let texts = [{
        	key:'RELEVANCE',
        	text:'已关联'
        },{
        	key:'UNRELEVANCE',
        	text:'未关联'
        },{
            key:'CONFIRM',
            text:'已确认'
        }];
        for (var i = 0; i < texts.length; i++) {
        	if(texts[i].key===status)
        		return texts[i].text;
        }
    }   
})*/
.component('batchGop', Component);

export default batchGopModule;