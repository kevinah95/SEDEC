(function() {
    'use strict';
    angular
        .module('sedecApp')
        .directive('navbarDirective', function() {
            return {
                templateUrl: '_core/directives/navbar/navbarDirective.html',
                transclude: true,
                replace: true,
                controller: 'NavbarController',
                controllerAs: 'navbar'
            };
        });
})();