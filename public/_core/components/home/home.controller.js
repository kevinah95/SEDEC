(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $timeout, $location, $auth) {
        this.message = "Hello";
        console.log($auth.isAuthenticated());
    }
})();