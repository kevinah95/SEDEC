(function() {
    'use strict';
    angular
        .module('admin.edituseradmin')
        .controller('EditUserAdminController', EditUserAdminController);

    function EditUserAdminController($scope, $location, $rootScope, adminUsersService) {
        var vm = this;

        $scope.$$postDigest(function() {
            console.log('$$postDigest executed. Digest completed');
            $scope.getOrganizations();
        });

        $scope.organizations = [];
        $scope.processes = [];
        $scope.currentUser = {};
        $scope.result = {}
        $scope.obj = {};


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
            $scope.result.userName = $scope.currentUser.userName;
            $scope.result.userMail = $scope.currentUser.userMail;


            adminUsersService.getOrganizations()
                .then(function(data) {
                    $scope.organizations = data;
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        $scope.updateProcesses = function() {
            adminUsersService.getOrganizationProcesses($scope.result.organizationId)
                .then(function(data) {
                    $scope.processes = data;
                })
                .catch(function(error) {
                    console.log(error);
                })
        }


        $scope.return = function() {
            $location.path('/admin/useradmin');
        }

        $scope.submit = function() {
            var arr = [];
            for (var i in $scope.processes) {
                if ($scope.processes[i].SELECTED == 1) {
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

            adminUsersService.updateUser($scope.obj)
                .then(function(data) {
                    $scope.deleteAllProcesses(arr, 0, $scope.obj.userId);
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        $scope.deleteAllProcesses = function(array, cont, user){
            adminUsersService.removeUserProcesses($scope.obj)
                .then(function(data) {
                    if (array.length > 0){
                        $scope.addProcesses(array, cont, user);
                    }
                    else{
                        $('.small.modal').modal('show');
                        $location.path('/admin/useradmin');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        $scope.addProcesses = function(array, cont, user) {
            if (cont < array.length) {

                $scope.currentProcess = {};
                $scope.currentProcess.userId = user;
                $scope.currentProcess.processId = array[cont];

                adminUsersService.associateUserProcess($scope.currentProcess)
                    .then(function(data) {
                        $scope.addProcesses(array, cont + 1, user);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })

            } else {
                $('.small.modal').modal('show');
                $location.path('/admin/useradmin');
            }
        }

    }
})();
