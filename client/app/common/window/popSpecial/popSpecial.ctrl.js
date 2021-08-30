class Controller {
    constructor($rootScope, $location) {
        'ngInject';

        this.$location = $location;

        this.name = 'popSpecial';
        this.isShow = false;

        this.text = '由于长时间未登录，该页面已过期不能访问请重新登录后进行查看';
        this.confirmtext = '重新登录';
        this.canceltext = '取消';


        let that = this;
        $rootScope.$on('changeConfirm', function (event, data) {
            if (data.show) {
                that.isShow = data.show;
            }

        });
        this.confirm = function () {
            that.isShow = false;
            that.$location.url('/home');

        }
        this.cancel = function () {
            that.isShow = false;
        }

    }

}

export default Controller;