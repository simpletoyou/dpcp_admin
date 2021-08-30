class Controller {
    constructor($scope, $timeout) {
        'ngInject';
        this.scope = $scope;
        this.timeout = $timeout;
        this.name = 'checkbox';


        // 列表
        this.gycheckboxarr = !this.gycheckboxarr || (Array.isArray(this.gycheckboxarr) && this.gycheckboxarr.length === 0) ? [
            {key: '100元', value: '', bcheck: true},
            {key: '200元', value: '', bcheck: false},
            {key: '300元', value: '', bcheck: false},
            {key: '400元', value: '', bcheck: false},
        ] : this.gycheckboxarr;

        // 默认值 及返回值   由组件判断
        this.gyreturnval = this.gycheckboxarr;
    };

    clickFN(index) {
        this.gyreturnval[index].bcheck = !this.gyreturnval[index].bcheck;
       // console.log(this.gyreturnval);
    };
}
;

export default Controller;