(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('homeCtrl', function($scope, $timeout, $location) {
            this.message = "Hello";
        });
})();