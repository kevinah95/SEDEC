(function() {
    'use strict';
    angular
        .module('admin.results')
        .controller('AdminResultsController', AdminResultsController);

    function AdminResultsController($scope, $location) {
        var vm = this;
        vm.people = [{ name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" },
            { name: "djkashdjkasd", age: "...", birthdate: "38120380" }
        ];
        vm.config = {
            itemsPerPage: 5,
            fillLastPage: true
        }

        /*vm.logout = logout;

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };*/

    }
})();