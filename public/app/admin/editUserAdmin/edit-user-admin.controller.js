(function() {
    'use strict';
    angular
        .module('admin.edituseradmin')
        .controller('EditUserAdminController', EditUserAdminController);

    function EditUserAdminController($scope, $location, $rootScope,adminUsersService) {
        var vm = this;
        /*vm.logout = logout;

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };*/
            $scope.$$postDigest(function() {
                console.log('$$postDigest executed. Digest completed');
                $scope.getOrganizations();
            });

        $scope.organizations = [];
        $scope.processes = [];
        $scope.currentUser = {};
        $scope.result ={}


        $('.ui.form')
            .form({
                fields: {
                    name: {
                        rules: [{ type: 'empty', prompt: 'Debe indicar el nombre del usuario' }]
                    },
                    email: {
                        rules: [{ type: 'email', prompt: 'Ingrese un correo válido' }]
                    }
                },
                inline: true,
                on: 'blur'
            })


        $scope.getOrganizations = function() {
            $scope.currentUser = $rootScope.editableUser;
            console.log($scope.currentUser);
            $scope.result.userName = $scope.currentUser.userName;
            $scope.result.userMail = $scope.currentUser.userMail;


            adminUsersService.getOrganizations()
                .then(function(data){
                    $scope.organizations = data;
                })
                .catch(function(error){
                    console.log(error);
                })
        }

        $scope.updateProcesses = function(){
            adminUsersService.getOrganizationProcesses($scope.result.organizationId)
                .then(function(data){
                    $scope.processes = data;
                })
                .catch(function(error){
                    console.log(error);
                })
        }


        $scope.return = function() {
            $location.path('/admin/useradmin');
        }

        $scope.signup = function() {
            console.log("Post new user information");
        }

        $scope.submit = function(){
            var arr = [];
            for(var i in $scope.processes){
               if($scope.processes[i].SELECTED==1){
                   arr.push($scope.processes[i].processId);
               }
            }
            $scope.obj = {};
            $scope.obj.isAdmin = $scope.result.isAdmin;
            $scope.obj.userName = $scope.result.userName;
            $scope.obj.userMail = $scope.result.userMail;
            var temp = JSON.parse($scope.result.organizationId);
            $scope.obj.organizationId = temp.organizationId;
            $scope.obj.userId = $scope.currentUser.userId;
            console.log(arr);
            

            adminUsersService.updateUser($scope.obj)
                .then(function(data){
                    console.log(data);
                })
                .catch(function(error){
                    console.log(error);
                })
        }

    }
})();