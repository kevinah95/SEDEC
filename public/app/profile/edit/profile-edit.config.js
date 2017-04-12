(function() {
    'use strict';
    angular
        .module('profile.edit')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('profile.edit', {
                url: '/edit',
                /*parent: 'profile',*/
                templateUrl: 'app/profile/edit/profile-edit.view.html',
                controller: 'EditUserController',
                controllerAs: 'vm',
                css: 'app/profile/edit/profile-edit.style.css'
            });


    };
})();