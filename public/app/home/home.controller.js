(function() {
    'use strict';
    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    function HomeController($auth, toastr) {
        this.message = "Hello";
        if ($auth.isAuthenticated()) {
            toastr.success('Usuario autenticado', 'Success');
        }
    }
})();