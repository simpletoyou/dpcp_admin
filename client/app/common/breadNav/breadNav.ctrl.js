class Controller {
    constructor($rootScope, $location, navConfigFactory) {
        'ngInject';

        this.name = 'breadNav';
        this.$location = $location;
        this.items = navConfigFactory.getData();
        this.$rootScope = $rootScope;

        this.addListener();
    }

    addListener() {
        let items = this.items;

        this.$rootScope.$on('$locationChangeStart', function (event, toState) {
            let path = this.$location.path();
            // let path = (toState||'').split("#")[1];
            this.items = (path && items[path]) || [];
        }.bind(this));
    }
}

export default Controller;