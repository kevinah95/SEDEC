(function() {
    'use strict';
    angular
        .module('admin.edituseradmin')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin.edituseradmin', {
                url: '/edituseradmin',
                /*parent: 'admin',*/
                templateUrl: 'app/admin/editUserAdmin/edit-user-admin.view.html',
                controller: 'EditUserAdminController',
                controllerAs: 'vm'
            });


    };
})();