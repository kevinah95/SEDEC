(function() {
    'use strict';
    angular
        .module('app.profile')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/profile', '/profile/main');
        $stateProvider
            .state('profile', {
                abstract: true,
                url: '/profile',
                template: '<ui-view/>'
                    /*controller: ['$scope', '$state',
                        function($scope, $state) {
                            $state.go('profile.main');
                        }
                    ]*/
            })
            .state('profile.main', {
                url: '/main',
                templateUrl: 'app/profile/main/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                css: 'app/profile/main/profile.style.css'
            });


    };
})();