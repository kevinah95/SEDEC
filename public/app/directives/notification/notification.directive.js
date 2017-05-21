(function() {
    'use strict';
    angular
        .module('sedecApp')
        .directive('notificationDirective', notificationDirective);

    function notificationDirective() {
        var directive = {
            templateUrl: 'app/directives/notification/notificationDirective.html',
            transclude: true,
            replace: true,
            controller: 'NotificationController',
            controllerAs: 'notification'
        };
        return directive;
    }
})();