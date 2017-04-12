(function() {
    'use strict';
    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, $state) {
        var vm = this;
        vm.results = {};
        vm.user = {};
        vm.userInfo = {
            mailp: "kevinah95@gmail.com",
            passp: "123"
        };
        vm.logout = logout;
        vm.editUser = editUser;


        $scope.$$postDigest(function() {
            vm.user = $rootScope.currentUser;
        });

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function editUser() {
            /*$location.path('/profile/edit');
            if (!$scope.$$phase) {
                $scope.$apply();
            }*/
            $state.transitionTo('profile.edit');
            //$state.go('profile.edit');
        };

    }
})();