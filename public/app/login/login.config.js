(function() {
    'use strict';
    angular
        .module('app.login')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                css: 'app/login/login.css'
            });
    };
})();