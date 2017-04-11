(function() {
    'use strict';
    angular
        .module('sedecApp')
        .config(config)
        .run(runBlock);

    function config($routeProvider, $locationProvider, $authProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider.
        state('login', {
            url: '/login',
            templateUrl: 'app/components/login/login.view.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            css: 'app/components/login/login.css'
        }).
        state('home', {
            url: '/home',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeController',
            css: 'app/components/home/home.css'
        }).
        state('profile', {
            url: '/profile',
            templateUrl: 'app/components/profile/profileView.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            css: 'app/components/profile/profile.style.css'
        }).
        state('results', {
            url: '/results',
            templateUrl: 'app/components/results/resultsView.html',
            controller: 'ResultsController',
            controllerAs: 'vm',
            css: 'app/components/results/results.css'
        }).
        state('upload', {
            url: '/upload',
            templateUrl: 'app/components/upload/uploadView.html',
            controller: 'UploadController',
            controllerAs: 'vm',
            css: 'app/components/upload/upload.css'
        }).
        state('editUser', {
            url: '/editUser',
            templateUrl: 'app/components/editUser/editUserView.html',
            controller: 'EditUserController',
            controllerAs: 'vm',
            css: 'app/components/editUser/editUser.css'
        }).
        state('admin', {
            url: '/admin',
            templateUrl: 'app/components/admin/main/admin.view.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        }).
        state('admin.signup', {
            url: '/admin/signup',
            templateUrl: 'app/components/admin/signup/signup.view.html',
            controller: 'SignupController',
            controllerAs: 'vm'
        });

        /*$routeProvider.otherwise({
            redirectTo: '/login'
        });*/

        $urlRouterProvider.otherwise('login');

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