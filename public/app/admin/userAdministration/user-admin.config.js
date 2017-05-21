(function() {
    'use strict';
    angular
        .module('admin.useradmin')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin.useradmin', {
                url: '/useradmin',
                /*parent: 'admin',*/
                templateUrl: 'app/admin/userAdministration/user-admin.view.html',
                controller: 'UserAdminController',
                controllerAs: 'vm'
            });


    };
})();