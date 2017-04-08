(function() {
    'use strict';
    angular
        .module('sedecApp')
        .config(config)
        .run(runBlock);

    function config($routeProvider, $locationProvider, $authProvider) {

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
            controllerAs: 'vm',
            css: '_core/components/login/login.css'
        });

        $routeProvider.when('/upload', {
            templateUrl: '_core/components/upload/uploadView.html',
            controller: 'UploadController',
            controllerAs: 'vm',
            css: '_core/components/upload/upload.css'
        });

        $routeProvider.when('/editUser', {
            templateUrl: '_core/components/editUser/editUserView.html',
            controller: 'EditUserController',
            controllerAs: 'vm',
            css: '_core/components/editUser/editUser.css'
        });

        $routeProvider.when('/admin', {
            templateUrl: '_core/components/admin/main/admin.view.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/admin/signup', {
            templateUrl: '_core/components/admin/signup/signup.view.html',
            controller: 'SignupController',
            controllerAs: 'vm'
        });

        $routeProvider.otherwise({
            redirectTo: '/login'
        });

        $authProvider.loginUrl = 'http://localhost:8080/api/auth/login';
        //$authProvider.signupUrl = 'http://localhost:8080/auth/signup';

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    };

    // For more info: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#run-blocks
    function runBlock($rootScope, $route, $location, $window, $auth) {
        //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
        //bind in induvidual controllers.

        if ($auth.isAuthenticated()) {
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        }

        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
        });
    };
})();