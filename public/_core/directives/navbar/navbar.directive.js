(function() {
    'use strict';
    angular
        .module('sedecApp')
        .directive('navbarDirective', navbarDirective);

    function navbarDirective() {
        var directive = {
            templateUrl: '_core/directives/navbar/navbarDirective.html',
            transclude: true,
            replace: true,
            controller: 'NavbarController',
            controllerAs: 'navbar'
        };
        return directive;
    }
})();