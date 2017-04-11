(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('SignupController', SignupController);

    function SignupController($scope, $location) {
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