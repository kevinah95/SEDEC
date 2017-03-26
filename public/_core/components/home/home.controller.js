(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $timeout, $location) {
        this.message = "Hello";
    }
})();