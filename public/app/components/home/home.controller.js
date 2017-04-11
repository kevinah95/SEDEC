(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $timeout, $location, $auth, toastr) {
        this.message = "Hello";
        if ($auth.isAuthenticated()) {
            toastr.success('Usuario autenticado', 'Success');
        }
    }
})();