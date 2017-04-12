(function() {
    'use strict';
    angular
        .module('app.admin')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/admin', '/admin/main');
        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                template: '<ui-view/>'
            })
            .state('admin.main', {
                url: '/main',
                templateUrl: 'app/admin/main/admin.view.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            });


    };
})();