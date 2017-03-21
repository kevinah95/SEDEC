var app = angular.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/home', {
        templateUrl: '_core/components/home/homeView.html',
        controller: 'homeCtrl',
        css: '_core/components/home/home.css'
    });

    $routeProvider.when('/profile', {
        templateUrl: '_core/components/profile/profileView.html',
        controller: 'profileCtrl',
        css: '_core/components/profile/profile.css'
    });


    $routeProvider.when('/results', {
        templateUrl: '_core/components/results/resultsView.html',
        controller: 'resultsCtrl',
        css: '_core/components/results/results.css'
    });

    $routeProvider.when('/login', {
        templateUrl: '_core/components/login/loginView.html',
        controller: 'loginCtrl',
        css: '_core/components/login/login.css'
    });

    $routeProvider.when('/upload', {
        templateUrl: '_core/components/upload/uploadView.html',
        controller: 'uploadCtrl',
        css: '_core/components/upload/upload.css'
    });

    $routeProvider.when('/editUser', {
        templateUrl: '_core/components/editUser/editUserView.html',
        controller: 'editUserCtrl',
        css: '_core/components/editUser/editUser.css'
    });

    $routeProvider.otherwise({
        redirectTo: '/login'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(function($rootScope, $route, $location, $window) {
    //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
    //bind in induvidual controllers.

    $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });
});