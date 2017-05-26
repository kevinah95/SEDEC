(function() {
    'use strict';
    angular
        .module('admin.useradmin')
        .controller('UserAdminController', UserAdminController);

    function UserAdminController($scope, $location,$rootScope,adminUsersService) {
        var vm = this;
        /*vm.logout = logout;

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };*/

        $scope.users = []
        $scope.marks = []

        $scope.init = function(){
            $scope.users = {}
            $scope.marks = []

            adminUsersService.getAllUsers()
                .then(function(data){
                    $scope.users = data;
                    $scope.chargeMarks();
                })
                .catch(function(error){
                    console.log(error);
                })

        }

        $scope.chargeMarks = function(){
            for (var i in $scope.users){
                if ($scope.users[i].isAdmin == true){
                    $scope.marks.push("green checkmark");
                }
                else{
                    $scope.marks.push("red remove");
                }
            }
        }

        $scope.disableUser = function(index){
            adminUsersService.disableUser($scope.users[index])
                .then(function(data){
                    console.log(data);
                })
                .catch(function(error){
                    console.log(error);
                })

            $scope.init();
            
        }

        $scope.editUser = function(index){
            $rootScope.editableUser = $scope.users[index];
            $location.path('/admin/edituseradmin');
        }

        $scope.signup = function(){
            $location.path('/admin/signup');
        }

    }
})();