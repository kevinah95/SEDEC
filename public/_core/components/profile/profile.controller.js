(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, profileService) {
        var vm = this;
        vm.results = {};
        vm.user = {};
        vm.userInfo = {
            mailp: "kevinah95@gmail.com",
            passp: "123"
        };
        vm.logout = logout;
        vm.editUser = editUser;
        vm.activate = activate;

        $scope.$$postDigest(function() {
            console.log('$$postDigest executed. Digest completed');
            //console.log(vm.activate(vm.userInfo));
            vm.activate(vm.userInfo);
        });

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function editUser() {
            $location.path('/editUser')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function activate(info) {
            return profileService.checkUser(info)
                .then(function(data) {
                    vm.user = data

                    return vm.user;
                })
                .catch(function(error) {
                    console.log(error);
                    return error;
                });
        };

    }
})();