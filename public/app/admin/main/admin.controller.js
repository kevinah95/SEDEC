(function () {
    'use strict';
    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    function AdminController($scope, $location, $auth, $state) {
        var vm = this;
        vm.users = users;

        vm.results = results;
        vm.org = org;

        function users() {
            $location.path('/admin/useradmin');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };


        function results() {
            $state.go('admin.results');
        };

        function org() {
            $location.path('/admin/org');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

    }
})();