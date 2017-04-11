(function() {
    'use strict';
    angular
        .module('app.profile')
        .config(config);

    function config($stateProvider, $urlRouterProvider, $provide) {
        $urlRouterProvider.when('/profile', '/profile/index');
        //$urlRouterProvider.when('/profile/index', '/profile/index');
        console.log("dasdasdasd");
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

        .state('profile.index', {
            url: '/index',
            templateUrl: 'app/profile/profile.view.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            css: 'app/profile/profile.style.css'
                /*views: {
                    'profile-view': {
                        templateUrl: 'app/profile/view/profile-view.view.html',
                        controller: 'ProfileController',
                        controllerAs: 'vm',
                        css: 'app/profile/view/profile-view.style.css'
                    }
                }*/

        });
    };
})();