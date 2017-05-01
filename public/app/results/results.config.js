(function() {
    'use strict';
    angular
        .module('app.results')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('results', {
                url: '/results',
                templateUrl: 'app/results/results.view.html',
                controller: 'ResultsController',
                controllerAs: 'vm',
                css: 'app/results/results.style.css'
            });
    };
})();