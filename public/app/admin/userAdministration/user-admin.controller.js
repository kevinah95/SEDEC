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

        $scope.disableUser = function(){
            var index =  $scope.currentUserDelete;
            adminUsersService.disableUser($scope.users[index])
                .then(function(data){
                    console.log(data);
                })
                .catch(function(error){
                    console.log(error);
                })

            $scope.hideConfirmation();
            $scope.init();
            
        }

        $scope.showConfirmation = function(index){
            $scope.currentUserDelete = index;
            $('.basic.modal').modal('show');
        }

        $scope.hideConfirmation = function(){
            $('.basic.modal').modal('hide');
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