var app = angular.module('sedecApp', ['ngRoute','angularCSS']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/home', {
        templateUrl: '_core/components/home/homeView.html',
        controller: 'homeCtrl',
        css: '_core/components/home/home.css'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(function($rootScope, $route, $location,$window){
    //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
    //bind in induvidual controllers.

    $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });
});

