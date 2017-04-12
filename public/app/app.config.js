(function() {
    'use strict';
    angular
        .module('sedecApp')
        .config(config)
        .run(runBlock);

    function config($routeProvider, $locationProvider, $authProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('login');
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/components/admin/main/admin.view.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            }).state('admin.signup', {
                url: '/admin/signup',
                templateUrl: 'app/components/admin/signup/signup.view.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            });

        /*$routeProvider.otherwise({
            redirectTo: '/login'
        });*/



        $authProvider.loginUrl = 'http://localhost:8080/api/auth/login';
        //$authProvider.signupUrl = 'http://localhost:8080/auth/signup';

        // use the HTML5 History API
        $locationProvider.html5Mode(true).hashPrefix('!');
        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
            rewriteLinks: false
        });*/
    };

    // For more info: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#run-blocks
    function runBlock($rootScope, $route, $location, $window, $auth, $state) {
        //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
        //bind in induvidual controllers.

        if ($auth.isAuthenticated()) {
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        }

        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
        });

        // -- just to see our about => about state 'change'
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('toState:   ' + toState.name);
            console.log('fromState: ' + (fromState.name || 'Just got there! click again!'));
        })

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeError - fired when an error occurs during transition.');
            console.log(arguments);
        });
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
            console.log(unfoundState, fromState, fromParams);
        });
    };
})();