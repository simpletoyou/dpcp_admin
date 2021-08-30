class Controller {
    constructor($scope, $timeout) {
        'ngInject';
        this.scope = $scope;
        this.timeout = $timeout;
        this.name = 'radio';

        // 单选数据列表
        this.radioList = !this.gyradioarr || (Array.isArray(this.gyradioarr) && this.gyradioarr.length === 0) ? [
            {key: '100元', value: '', bcheck: true},
            {key: '200元', value: '', bcheck: false},
            {key: '300元', value: '', bcheck: false},
            {key: '400元', value: '', bcheck: false},
        ] : this.gyradioarr;

        // 默认值显示数组第一项   传回值 
        this.gyreturn = this.radioList[0];
    };

    clickFN(index) {
        this.radioList.forEach((item)=> {
            item.bcheck = false;
        });
        this.radioList[index].bcheck = !this.radioList[index].bcheck;
        this.gyreturn = this.radioList[index];
       // console.log(this.gyreturn);
    };
}
;

export default Controller;