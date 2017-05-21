(function() {
    'use strict';
    angular
        .module('admin.useradmin')
        .controller('UserAdminController', UserAdminController);

    function UserAdminController($scope, $location) {
        var vm = this;
        /*vm.logout = logout;

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };*/

    }
})();