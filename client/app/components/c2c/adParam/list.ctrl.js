import config from '../config';

import passwordDialog from '../passwordDialog.html';

class ListController {
    /**
     *
     * @param $scope
     */
    constructor($scope, c2cSvc, $uibModal, $location, $cookies) {
        "ngInject";

        this.$scope = $scope;
        this.service = c2cSvc;
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.$cookies = $cookies;

        this.isLoading = false;
        this.isAddCoin = false;
        this.isAddCountry = false;



        this.init();
    }

    init() {

    }


    addCoin(){

    }

    addCountry(){

    }
}


export default ListController;
