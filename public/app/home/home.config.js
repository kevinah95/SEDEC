(function() {
    'use strict';
    angular
        .module('app.home')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.view.html',
                controller: 'HomeController',
                css: 'app/home/home.css'
            });
    };
})();