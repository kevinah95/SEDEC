(function () {
    'use strict';
    angular
        .module('admin.org')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin.org', {
                url: '/org',
                /*parent: 'admin',*/
                templateUrl: 'app/admin/org/admin-org.view.html',
                controller: 'OrgController',
                controllerAs: 'vm'
            });


    };
})();