(function() {
    'use strict';
    angular
        .module('admin.signup')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin.signup', {
                url: '/signup',
                /*parent: 'admin',*/
                templateUrl: 'app/admin/signup/admin-signup.view.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            });


    };
})();