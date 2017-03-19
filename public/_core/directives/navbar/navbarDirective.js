app.directive('navbarDirective', function() {
    return {
        templateUrl: '_core/directives/navbar/navbarDirective.html',
        transclude: true,
        replace: true
    };
});