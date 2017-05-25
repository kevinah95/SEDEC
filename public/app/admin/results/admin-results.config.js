(function() {
    'use strict';
    angular
        .module('admin.results')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin.results', {
                url: '/results',
                /*parent: 'admin',*/
                templateUrl: 'app/admin/results/admin-results.view.html',
                controller: 'AdminResultsController',
                controllerAs: 'vm',
                css: 'app/admin/results/assets/css/admin-results.style.css'
            });


    };
})();