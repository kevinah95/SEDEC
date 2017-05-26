(function() {
    'use strict';
    angular
        .module('admin.signup')
        .controller('SignupController', SignupController);

    function SignupController($scope, $location, $rootScope, adminUsersService) {
        var vm = this;
        /*vm.logout = logout;

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };*/
        $scope.organizations = [];
        $scope.processes = [];

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
            $scope.obj.userProfilePicture = "https://image.freepik.com/free-icon/male-user-silhouette_318-35708.jpg";
            $scope.obj.isAdmin = $scope.result.isAdmin;
            $scope.obj.userName = $scope.result.userName;
            $scope.obj.userMail = $scope.result.userMail;
            $scope.obj.organizationId = $scope.result.organizationId.organizationId;
            console.log($scope.obj);
            console.log(arr);

            adminUsersService.createUser($scope.obj)
                .then(function(data){
                    console.log(data);
                })
                .catch(function(error){
                    console.log(error);
                })
        }

    }
})();
