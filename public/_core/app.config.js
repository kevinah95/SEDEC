(function() {
    'use strict';
    angular
        .module('sedecApp')
        .config(config)
        .run(runBlock);

    function config($routeProvider, $locationProvider) {

        $routeProvider.when('/home', {
            templateUrl: '_core/components/home/homeView.html',
            controller: 'HomeController',
            css: '_core/components/home/home.css'
        });

        $routeProvider.when('/profile', {
            templateUrl: '_core/components/profile/profileView.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            css: '_core/components/profile/profile.style.css'
        });


        $routeProvider.when('/results', {
            templateUrl: '_core/components/results/resultsView.html',
            controller: 'ResultsController',
            controllerAs: 'vm',
            css: '_core/components/results/results.css'
        });

        $routeProvider.when('/login', {
            templateUrl: '_core/components/login/loginView.html',
            controller: 'LoginController',
            css: '_core/components/login/login.css'
        });

        $routeProvider.when('/upload', {
            templateUrl: '_core/components/upload/uploadView.html',
            controller: 'UploadController',
            css: '_core/components/upload/upload.css'
        });

        $routeProvider.when('/editUser', {
            templateUrl: '_core/components/editUser/editUserView.html',
            controller: 'EditUserController',
            css: '_core/components/editUser/editUser.css'
        });

        $routeProvider.otherwise({
            redirectTo: '/login'
        });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    };

    // For more info: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#run-blocks
    function runBlock($rootScope, $route, $location, $window) {
        //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
        //bind in induvidual controllers.

        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
        });
    };
})();