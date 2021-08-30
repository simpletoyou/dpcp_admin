import template from './loginwindow.html';
import controller from './loginwindow.ctrl';
import './loginwindow.less';

let Component = {
    restrict: 'E',
    bindings: {
        gyemail: '=?gyemail',
        gyemailChangeFN: '=?gyemailChangeFN',
        gypassword: '=?gypassword',
        gypasswordChangeFN: '=?gypasswordChangeFN'
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default Component;